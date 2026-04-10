import os
import json
from groq import Groq
from dotenv import load_dotenv

from schemas.email_schema import EmailAgentOutput

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)

prompt_path = os.path.join(PROJECT_ROOT, "prompts/email_prompt.txt")

def generate_emails(instruction, participants):

    # Load prompt template
    with open(prompt_path, "r", encoding="utf-8") as f:
        prompt_template = f.read()

    # Fill prompt variables
    prompt = prompt_template.format(
        instruction=instruction,
        participants=participants
    )

    # Call LLM
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.4
    )

    content = response.choices[0].message.content

    # ---- Clean LLM Output ----
    content = content.replace("```json", "").replace("```", "").strip()

    # Extract JSON portion
    start = content.find("{")
    end = content.rfind("}") + 1
    content = content[start:end]

    # Convert JSON string → Python dict
    data = json.loads(content)

    # Validate using schema
    result = EmailAgentOutput(**data)

    return result