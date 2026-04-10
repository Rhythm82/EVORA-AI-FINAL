import os
import re
from groq import Groq
from dotenv import load_dotenv

from schemas.social_schema import SocialMediaOutput

# load environment variables
load_dotenv()

# initialize groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def clean_llm_json(text: str) -> str:
    """
    Removes markdown wrappers like ```json ... ```
    so that the JSON can be parsed correctly.
    """

    text = text.strip()

    # remove ```json at beginning
    text = re.sub(r"^```json", "", text)

    # remove starting ```
    text = re.sub(r"^```", "", text)

    # remove ending ```
    text = re.sub(r"```$", "", text)

    return text.strip()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
prompt_path = os.path.join(PROJECT_ROOT, "prompts/social_prompt.txt")


def generate_social_content(event_description: str) -> SocialMediaOutput:

    # load prompt template
    with open(prompt_path, "r", encoding="utf-8") as f:
        prompt_template = f.read()

    # insert event description
    prompt = prompt_template.format(event_description=event_description)

    # call LLM
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )

    content = response.choices[0].message.content

    # ⭐ clean markdown JSON if present
    content = clean_llm_json(content)

    # convert string JSON to pydantic model
    result = SocialMediaOutput.model_validate_json(content)

    return result