# Meme Gallery API

A tiny **Node + Express** API that serves and creates memes. Uses ES Modules and in-memory data (no database yet).

## Quick Start
```bash
npm install
npm start
```
Server runs at: `https://localhost:3000`
    Required Node 18+ (check with node -v)
## Tech
    - Node.js, Express
    - ES6+: `import`, arrow functions, destructuring, async handler
    - `express.json()` for  JSON body parsing
## Project Structure
```
meme-gallery-api/
  ├─ index.js
  ├─ package.json
  ├─ .gitignore
  ├─ README.md
  └─ (optional) postman_collection.json
```
## .git.ignore
This repo ignores:
```bash
node_modules/
.env
.env.local
.DS_Store
Thumbs.db
```
## Endpoints
***GET /memes***
Returns all memes
**Response 200**
```json
[
  { "id": 1, "title": "Distracted Boyfriend", "url": "https://i.imgur.com/example1.jpg" },
  { "id": 2, "title": "Success Kid", "url": "https://i.imgur.com/example2.jpg" }
]
```
***POST /memes***
Create a meme. Body must be JSON.

**Request body**
```json
{
  "title": "Coding Cat",
  "url": "https://i.imgur.com/codingcat.jpg"
}
```
**Response 201**
```json
{
  "id": 3,
  "title": "Coding Cat",
  "url": "https://i.imgur.com/codingcat.jpg"
}
```
**Validation & Errors**
- Missing/blank `title` or `url` → **400**
```json
{ "error": "Title and URL are required." }
```
- Malformed JSON → **400**
```json
{ "error": "Malformed JSON" }
```
## How to Test
**With Postman**
1. `GET http:localhost:3000/memes` → expect 200 + list
2. `POST http://localhost:3000/memes
   - Body → raw → JSON (use the example above)
   - Expect 201 Created + the new object
3. `GET` again to see it added
**With curl (Git Bash)**
```bash
# GET
curl http://localhost:3000/memes

# POST
curl -X POST http://localhost:3000/memes \
  -H "Content-Type: application/json" \
  -d '{"title":"Coding Cat","url":"https://i.imgur.com/codingcat.jpg"}'
```
## Screenshots / Postman

- `docs/screenshots/POST.png`
![GET /memes](docs/screenshots/GET.png)
- `docs/screenshots/GET.png`
![POST /memes](docs/screenshots/POST.png)
- `docs/screenshots/LocalHost.png`
![LocalHost /memes](docs/screenshots/LocalHost.png)

## Notes 
- Data is in-memory. Restarting the server resets the list.

- `package.json` includes `"type": "module"` so we can use import.

- Consider `nodemon` for auto-restart during development:
```bash
npm i -D nodemon
# add "dev": "nodemon index.js" to package.json scripts
npm run dev
```
## Next Steps (Stretch)
- Stronger URL validation
- PUT/PATCH/DELETE routes
- Connect to a real database (MongoDB/SQLite/Postgres)
- Deploy to Versel/Render


