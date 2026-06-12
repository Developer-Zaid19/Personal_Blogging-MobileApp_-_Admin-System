make my personal bloging mobile app in react native, maine setup banadiya hai android 6 ki compatibilty ke liye tmhe bs app banani hai us app me blogs and pdf notes ka show case hoga jo ayenge in urls se

https://devzaidbackend.onrender.com/api/content/blogs  => blog list
https://devzaidbackend.onrender.com/api/content/blogs/:id  => blog by their id
https://devzaidbackend.onrender.com/api/content/notes   => pdf notes list
https://devzaidbackend.onrender.com/note-pdf/${":id"}.pdf  => download pdf by their id

use this root colors that are in my website already and make dark light theme toggle button
:root {
  --maincolor: #00BCFF;
  --mainsoft: #5ad9ff;
  --maindark: #0090cc;
  --mainglow: rgba(0, 188, 255, 0.12);
  --mainglow-strong: rgba(0, 188, 255, 0.25);

  --bg: #f8fbff;
  --bgt: #eef6ff;
  --bgcard: rgba(0, 188, 255, 0.06);

  --text: #0f172a;
  --text-muted: #64748b;

  --border: rgba(0, 144, 204, 0.12);
  --border-hover: rgba(0, 144, 204, 0.28);

  --focus: #3766d1;
  --err: rgb(220, 38, 38);
}


html.dark {
  --maincolor: #00BCFF;
  --mainsoft: #38d4ff;
  --maindark: #0090cc;
  --mainglow: rgba(0, 188, 255, 0.2);
  --mainglow-strong: rgba(0, 188, 255, 0.45);

  --bg: #080e1a;
  --bgt: #0d1525;
  --bgcard: rgba(0, 188, 255, 0.04);

  --text: #e2eeff;
  --text-muted: #6b83a8;

  --border: rgba(0, 188, 255, 0.12);
  --border-hover: rgba(0, 188, 255, 0.4);

  --focus: #3766d1;
  --err: rgb(255, 80, 80);
}
