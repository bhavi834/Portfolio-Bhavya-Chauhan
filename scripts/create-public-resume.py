from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
import fitz

root = Path(__file__).resolve().parents[1]
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='NameCustom', fontName='Helvetica-Bold', fontSize=25, leading=30, textColor=HexColor('#142338'), spaceAfter=5))
styles.add(ParagraphStyle(name='BodyCustom', fontName='Helvetica', fontSize=9, leading=13, spaceAfter=5, textColor=HexColor('#374151')))
styles.add(ParagraphStyle(name='SectionCustom', fontName='Helvetica-Bold', fontSize=10, leading=14, spaceBefore=13, spaceAfter=6, textColor=HexColor('#315b90')))
styles.add(ParagraphStyle(name='RoleCustom', fontName='Helvetica-Bold', fontSize=10, leading=14, spaceBefore=4, spaceAfter=4, textColor=HexColor('#142338')))
story = []
def p(text, style='BodyCustom'): story.append(Paragraph(text, styles[style]))
def section(text): p(text, 'SectionCustom')
p('Bhavya Chauhan', 'NameCustom')
p('Software Developer | AI/ML Engineer')
p('New Delhi, India | <link href="mailto:bhavyachauhan3112@gmail.com">bhavyachauhan3112@gmail.com</link>')
p('<link href="https://github.com/bhavi834">github.com/bhavi834</link> | <link href="https://www.linkedin.com/in/bhavya-chauhan-b8997b286/">LinkedIn: bhavya-chauhan-b8997b286</link>')
story.append(Spacer(1, 5))
story.append(HRFlowable(width='100%', thickness=1, color=HexColor('#c8d2df')))
section('EXPERIENCE')
p('Grid Apps LLC | Software Development Intern', 'RoleCustom')
p('June 2026 to present | New York, USA')
p('Developing Next.js frontend modules for a multi-tenant CMS, integrating Laravel REST APIs for dynamic content and CRUD operations. Improving multilingual experiences through reusable components and localized content rendering. Enhancing dashboard navigation, responsive UI, API integrations and data presentation.')
p('ONGC Ltd | SAP ABAP Intern', 'RoleCustom')
p('June 2025 to July 2025 | New Delhi, India')
p('Developed SAP ABAP solutions for vendor, tender, EMD and refund management under Project ICE. Built module-pool Dynpro applications, Open SQL data handling, ALV reports and Adobe PDF reporting, with validations and role-based functionality.')
section('SELECTED PROJECTS')
p('PPE Detection Kit | Python, YOLO, OpenCV, PyTorch, NumPy', 'RoleCustom')
p('Developed a computer vision system to detect helmets, safety vests and other protective equipment in video feeds, identifying PPE violations to support workplace safety monitoring.')
p('Paw Patrol | HTML, CSS, JavaScript, PHP, MySQL, REST APIs', 'RoleCustom')
p('Built a pet-care platform for adoption, fostering, services and supplies, with authentication, role-based access, CRUD operations and structured database management.')
p('AlertLens | Hackathon runner-up', 'RoleCustom')
p('Built a system that groups and analyzes alerts, identifies important issues and prioritizes incident response. Earned second place and an INR 30,000 prize.')
section('EDUCATION')
p('Manipal University Jaipur | 2023 to 2027', 'RoleCustom')
p("Bachelor's in Computer and Communication Engineering | CGPA: 7.97 / 10")
section('TECHNICAL SKILLS')
p('<b>Languages and data:</b> Python, C++, C, SQL, NumPy, Pandas, PySpark<br/><b>Web and systems:</b> Next.js, React, Laravel APIs, FastAPI, Flask, SAP ABAP, Git, Linux<br/><b>AI/ML:</b> PyTorch, OpenCV, machine learning, deep learning, NLP, LLMs, RAG, computer vision, XAI<br/><b>Foundations:</b> Data structures and algorithms, OOP, DBMS, operating systems, computer networks')
section('RECOGNITION AND LEADERSHIP')
p('<b>Student Excellence Award, twice:</b> Recognized for research contributions, innovative projects and consistent academic excellence.')
p('<b>IAESTE India LC MUJ:</b> Business Development and Internal Relations Manager. Coordinated incoming and outgoing exchanges, corporate outreach and international internship opportunities.')
p('<b>Student Placement Coordinator, Manipal University Jaipur:</b> Coordinated students and recruiters; supported recruitment processes involving 20+ companies.')
out = root / 'public' / 'Bhavya-Chauhan-Resume.pdf'
SimpleDocTemplate(str(out), pagesize=(595.28, 841.89), rightMargin=42, leftMargin=42, topMargin=34, bottomMargin=30, title='Bhavya Chauhan | Professional Resume', author='Bhavya Chauhan').build(story)
doc = fitz.open(out)
assert len(doc) == 1, f'Expected one page, got {len(doc)}'
text = ''.join(page.get_text() for page in doc).lower()
assert not any(term in text for term in ['passport', 'birth', 'flat no', 'vasant kunj'])
tmp = root / 'tmp' / 'pdfs'
tmp.mkdir(parents=True, exist_ok=True)
doc[0].get_pixmap(matrix=fitz.Matrix(1.5, 1.5)).save(tmp / 'public-resume.png')
print('Created public-safe one-page resume; privacy checks passed.')
