```markdown
# Postify

Postify — პოსტებისა და კონტენტის მართვის სოციალური/ბლოგინგ ვებ-აპლიკაცია. პროექტი მომხმარებლებს საშუალებას აძლევს შექმნან, გააზიარონ და მართონ თავიანთი პოსტები მარტივი და მოსახერხებელი ინტერფეისით.

## 🚀 ფუნქციონალი (Features)

* **პოსტების მართვა (CRUD):** ახალი პოსტის შექმნა, დათვალიერება, რედაქტირება და წაშლა.
* **მომხმარებელთა ავტორიზაცია:** რეგისტრაცია, სისტემაში შესვლა (Login) და პროფილის მართვა.
* **ინტერაქტიულობა:** პოსტების დათვალიერება და კომენტარების/ლაიქების ფუნქციონალი (თუ დამატებულია).

## 🛠 ტექნოლოგიები (Tech Stack)

* **Backend:** Python (Django / Django REST Framework)
* **Frontend:** HTML5, CSS3, JavaScript
* **Database:** SQLite / PostgreSQL

## 📦 პროექტის გაშვება

1. **რეპოზიტორიის კლონირება:**
   ```bash
   git clone [https://github.com/lxka806/Postify.git](https://github.com/lxka806/Postify.git)
   cd Postify

```

2. **ვირტუალური გარემოს შექმნა და აქტივაცია:**
```bash
python -m venv venv

# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

```


3. **დამოკიდებულებების ინსტალაცია:**
```bash
pip install -r requirements.txt

```


4. **მიგრაციები და სერვერის გაშვება:**
```bash
python manage.py migrate
python manage.py runserver

```


აპლიკაცია ხელმისაწვდომი იქნება მისამართზე: `http://127.0.0.1:8000/`

## 📄 ლიცენზია

ეს პროექტი ვრცელდება [MIT License](https://www.google.com/search?q=LICENSE) ლიცენზიით.

```

***

**როგორ დაამატოთ GitHub-ზე:**

1. თქვენს პროექტში შექმენით ფაილი სახელად `README.md`.
2. ჩაასพิมพ์ეთ ზემოთ მოცემული ტექსტი.
3. ატვირთეთ GitHub-ზე:
   ```bash
   git add README.md
   git commit -m "Add README.md for Postify project"
   git push origin main

```
