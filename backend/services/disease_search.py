from embeddings.search import semantic_search



def search_disease(
        query,
        top_k=5
):

    """
    Retrieve medically similar diseases
    using FAISS semantic search.
    """


    results = semantic_search(
        query,
        top_k=top_k
    )


    formatted_results = []


    for disease in results:


        formatted_results.append({

            "disease": disease.get(
                "Disease",
                disease.get("disease", "")
            ),


            "category": disease.get(
                "Category",
                disease.get("category", "")
            ),


            "symptoms": disease.get(
                "Common Symptoms",
                disease.get("symptoms", "")
            ),


            "treatment": disease.get(
                "Orthodox (Conventional) Treatment",
                disease.get("treatment", "")
            ),


            "herbal": disease.get(
                "Herbal / Traditional Remedies (commonly referenced)",
                disease.get("herbal", "")
            ),


            "notes": disease.get(
                "Notes",
                disease.get("notes", "")
            ),


            "similarity": round(
                float(
                    disease.get(
                        "score",
                        disease.get(
                            "similarity",
                            0
                        )
                    )
                ),
                3
            )

        })


    return formatted_results