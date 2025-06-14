import nltk
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def download_nltk_resources():
    resources = [
        'punkt',
        'punkt_tab',
        'averaged_perceptron_tagger',
        'wordnet',
        'stopwords'
    ]
    
    for resource in resources:
        try:
            logger.info(f"Downloading NLTK resource: {resource}")
            nltk.download(resource, quiet=True)
            logger.info(f"Successfully downloaded {resource}")
        except Exception as e:
            logger.error(f"Error downloading {resource}: {e}")
            raise

if __name__ == "__main__":
    download_nltk_resources() 