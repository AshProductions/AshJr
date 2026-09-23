# AshJr portfolio

Four pages: Home, Films, Commercial, About. Hosted on GitHub Pages. Plain HTML, CSS and JavaScript; no installation or build step.

## Add images and videos yourself

### Upload images
1. Open `assets` in GitHub.
2. Choose **Add file → Upload files**, select your JPG, PNG or WebP images, then **Commit changes**.
3. Use short filenames with no spaces, for example `leave-still-01.jpg`.
4. Keep galleries in their original aspect ratio. For thumbnails, use a separate image if you want a different crop. Aim for images around 2000 pixels wide and under 1 MB where practical.

### Update the content
Open `content.json`, click the pencil, change the relevant values, then **Commit changes**. Keep quotation marks and commas in place. GitHub Pages will publish the update automatically; allow a few minutes and refresh.

- `home.filmsImage`: image for the Narrative & Documentary homepage card.
- `home.commercialImage`: image for the Commercial homepage card. Currently blank, leaving a dark panel.
- `films.leave.youtube` / `films.viktor.youtube`: paste the YouTube film link.
- Add an optional `poster` field to either film to use your own video thumbnail: `"poster": "assets/leave-poster.jpg"`.
- Each film's `stills` list holds its gallery images. An empty list hides the gallery entirely.

Example stills list:
```json
"stills": [
  { "src": "assets/leave-still-01.jpg", "alt": "Describe what appears in the image" },
  { "src": "assets/leave-still-02.jpg", "alt": "Describe the second image" }
]
```

### Fill a commercial slot
Three blank slots are already included. Replace the empty values in one entry in `commercial`:
```json
{
  "title": "Your film title",
  "brand": "Brand name",
  "role": "Director · Editor",
  "youtube": "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  "image": "assets/ad-01.jpg"
}
```
Use `role` or `title` to identify a spec advertisement accurately if it was independently made rather than commissioned. Do not imply a brand commissioned it when it did not.

To add more ads, copy an entire entry and separate entries with commas. To remove an unused slot, delete its entire entry. Entries that remain entirely empty appear as blank image areas, without labels or links.

### YouTube settings
Use Public or Unlisted visibility, with embedding allowed. Private videos will not be playable by ordinary visitors. Upload the full films to YouTube, not GitHub. Players load after a visitor clicks; a direct YouTube link is also provided if embedded playback is unavailable. Rename the YouTube upload to Viktor too if its title still uses the old name; the website cannot change YouTube metadata.

### Project text and biography
Edit `films.html` for synopses, years and credits; edit `about.html` for biography and email. `index.html` controls the featured homepage project. `style.css` controls appearance.

Drake’s Fortune has stills only and is labelled In post-production. No release date or video is published.

## Preview locally
Run `python3 -m http.server 8000` in this folder and open http://localhost:8000. Opening the HTML directly as a local file will prevent the editable JSON content from loading in some browsers.

## Publication
GitHub Pages: Settings → Pages → Deploy from a branch → main → / (root).

All images and films remain the property of their respective rights holders.
