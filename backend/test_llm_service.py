from app.services.llm_service import llm_service

context = """
Artificial Intelligence (AI) is the simulation of human intelligence by machines.
"""

question = "What is Artificial Intelligence?"

answer = llm_service.generate_answer(
    question=question,
    context=context,
)

print(answer)