from embeddings.search import semantic_search


results = semantic_search(
    """
    I have been having high fever for three days.
    I feel cold and experience chills.
    I have headaches, body weakness and vomiting.
    """
)


for item in results:

    print("--------------------")

    print(
        "Disease:",
        item["disease"]
    )

    print(
        "Similarity:",
        item["similarity"]
    )