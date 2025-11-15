from mizan.core import evaluate_model

def test_evaluate_model():
    result = evaluate_model(None, None)
    assert result["accuracy"] == 0.95
    assert result["cultural_relevance"] == 0.88
