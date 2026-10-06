export const projectAudioMarkup = `
  <section class="project-audio" aria-labelledby="project-audio-title">
    <h2 id="project-audio-title">Project audio</h2>
    <p class="audio-note">Listen to audio from my projects, or download an MP3 to keep.</p>
    <p id="audio-login-note" class="audio-note"><a href="/">Log in as admin</a> to add or remove MP3 files.</p>
    <form id="audio-upload-form" class="audio-upload-form" enctype="multipart/form-data" hidden>
      <label for="audio-title">Title (optional)</label>
      <input id="audio-title" name="title" type="text" maxlength="120" placeholder="Audio title" />
      <label for="audio-file">MP3 file</label>
      <input id="audio-file" name="file" type="file" accept=".mp3,audio/mpeg,audio/mp3" aria-describedby="audio-upload-help" required />
      <p id="audio-upload-help" class="audio-note">MP3 files up to 25 MB. Leave the title blank to use the filename.</p>
      <button type="submit">Upload MP3</button>
    </form>
    <p id="audio-upload-status" class="audio-note" role="status" aria-live="polite"></p>
    <p id="audio-list-status" class="audio-note" role="status" aria-live="polite">Loading project audio…</p>
    <div id="audio-list" class="audio-list"></div>
    <button id="audio-load-more" class="audio-button" type="button" hidden>Load more audio</button>
    <noscript><p>Enable JavaScript to browse and upload project audio.</p></noscript>
  </section>
`;

export function projectAudioScript() {
  return `<script>(${initProjectAudio.toString()})();</script>`;
}

function initProjectAudio() {
  const form = document.getElementById("audio-upload-form");
  const uploadStatus = document.getElementById("audio-upload-status");
  const listStatus = document.getElementById("audio-list-status");
  const list = document.getElementById("audio-list");
  const loginNote = document.getElementById("audio-login-note");
  const moreButton = document.getElementById("audio-load-more");
  let authenticated = false;
  let cursor = null;

  const setAuthenticated = (value) => {
    authenticated = value;
    form.hidden = !value;
    loginNote.hidden = value;
    list.querySelectorAll(".audio-remove").forEach((button) => { button.hidden = !value; });
  };

  const requestJson = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 401) setAuthenticated(false);
      throw new Error(data.error || "Unable to access project audio. Please try again.");
    }
    return data;
  };

  const addAudio = (file, prepend = false) => {
    const card = document.createElement("article");
    card.className = "audio-card";
    card.dataset.audioId = file.id;
    const heading = document.createElement("h3");
    heading.textContent = file.title;
    const details = document.createElement("p");
    details.className = "audio-note";
    details.textContent = file.filename + " · " + (file.size / (1024 * 1024)).toFixed(2) + " MB";
    const player = document.createElement("audio");
    player.controls = true;
    player.preload = "none";
    player.src = file.url;
    player.setAttribute("aria-label", file.title);
    player.addEventListener("error", () => {
      details.textContent = "Unable to play this MP3. Try downloading the file below.";
    });
    const actions = document.createElement("div");
    actions.className = "audio-actions";
    const download = document.createElement("a");
    download.href = file.url + "?download=1";
    download.download = file.filename;
    download.textContent = "Download MP3";
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "audio-button audio-remove";
    remove.textContent = "Remove";
    remove.setAttribute("aria-label", "Remove " + file.title);
    remove.hidden = !authenticated;
    remove.addEventListener("click", async () => {
      if (!window.confirm('Remove "' + file.title + '" from project audio?')) return;
      remove.disabled = true;
      try {
        await requestJson("/api/projects/audio/" + encodeURIComponent(file.id), { method: "DELETE" });
        player.pause();
        player.removeAttribute("src");
        player.load();
        card.remove();
        uploadStatus.textContent = "Audio file removed.";
        if (!list.children.length && !cursor) listStatus.textContent = "No project audio yet.";
      } catch (error) {
        uploadStatus.textContent = error.message;
        remove.disabled = false;
      }
    });
    actions.append(download, remove);
    card.append(heading, details, player, actions);
    if (prepend) list.prepend(card);
    else list.append(card);
    listStatus.textContent = "";
  };

  const loadAudio = async () => {
    moreButton.disabled = true;
    listStatus.textContent = "Loading project audio…";
    try {
      const data = await requestJson("/api/projects/audio" + (cursor ? "?cursor=" + encodeURIComponent(cursor) : ""));
      data.files.forEach((file) => {
        if (!Array.from(list.children).some((card) => card.dataset.audioId === file.id)) addAudio(file);
      });
      cursor = data.cursor;
      moreButton.hidden = !cursor;
      moreButton.textContent = "Load more audio";
      listStatus.textContent = list.children.length ? "" : "No project audio yet.";
    } catch (error) {
      listStatus.textContent = error.message;
      moreButton.hidden = false;
      moreButton.textContent = "Retry loading audio";
    } finally {
      moreButton.disabled = false;
    }
  };

  moreButton.addEventListener("click", loadAudio);
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const file = document.getElementById("audio-file").files[0];
    if (!file || !/\.mp3$/i.test(file.name)) {
      uploadStatus.textContent = "Choose an MP3 file to upload.";
      return;
    }
    if (!file.size || file.size > 25 * 1024 * 1024) {
      uploadStatus.textContent = "Choose a nonempty MP3 file up to 25 MB.";
      return;
    }
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    uploadStatus.textContent = "Uploading MP3…";
    const payload = new FormData(form);
    try {
      const data = await requestJson("/api/projects/audio", { method: "POST", body: payload });
      addAudio(data.file, true);
      form.reset();
      uploadStatus.textContent = "MP3 uploaded. It is now available on this page.";
    } catch (error) {
      uploadStatus.textContent = error.message;
    } finally {
      submit.disabled = false;
    }
  });

  fetch("/api/auth/session")
    .then((response) => response.ok ? response.json() : { authenticated: false })
    .then((session) => setAuthenticated(Boolean(session.authenticated)))
    .catch(() => setAuthenticated(false));
  loadAudio();
}
