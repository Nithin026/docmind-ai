from app.services.retrieval_service import retrieval_service
from app.services.llm_service import llm_service
from app.services.memory_service import memory_service


SIMILARITY_THRESHOLD = 0.6


class ChatService:

    def ask(
        self,
        question: str,
    ):

        # Retrieve relevant chunks
        results = retrieval_service.search(question)

        # No chunks found
        if not results["documents"] or not results["documents"][0]:
            return {
                "answer": "I couldn't find any relevant information in the uploaded documents.",
                "sources": [],
            }

        documents = results["documents"][0]
        metadata = results["metadatas"][0]
        distances = results.get("distances", [[]])[0]

        # Filter relevant chunks
        filtered_documents = []
        filtered_metadata = []

        for doc, meta, distance in zip(
            documents,
            metadata,
            distances,
        ):

            # Debug
            print(
                f"Page: {meta['page']} | Distance: {distance:.4f}"
            )

            if distance <= SIMILARITY_THRESHOLD:
                filtered_documents.append(doc)
                filtered_metadata.append(meta)

        # No relevant chunks after filtering
        if not filtered_documents:
            return {
                "answer": "I couldn't find relevant information in the uploaded documents.",
                "sources": [],
            }

        # Build structured context
        context_parts = []

        for doc, meta in zip(
            filtered_documents,
            filtered_metadata,
        ):

            context_parts.append(
                f"""
Source: {meta["filename"]}
Page: {meta["page"]}

Content:
{doc}
"""
            )

        context = "\n\n-----------------------------\n\n".join(
            context_parts
        )

        # Generate answer
        answer = llm_service.generate_answer(
            question=question,
            context=context,
        )

        # Store user question and assistant answer in history
        memory_service.add_user_message(question)
        memory_service.add_assistant_message(answer)

        # Remove duplicate sources
        seen = set()
        sources = []

        for item in filtered_metadata:

            key = (
                item["filename"],
                item["page"],
            )

            if key not in seen:

                seen.add(key)

                sources.append(
                    {
                        "filename": item["filename"],
                        "page": item["page"],
                    }
                )

        return {
            "answer": answer,
            "sources": sources,
        }


chat_service = ChatService()