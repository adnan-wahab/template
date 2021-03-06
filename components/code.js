import Prism from "prismjs";

export default function(dom, data) {
  let codeElements = [].slice.call(dom.querySelectorAll("dt-code"));
  codeElements.forEach(el => {
    let content = el.textContent;
    el.innerHTML = "";
    let language = el.getAttribute("language");
    let c = dom.createElement("code");
    if (el.getAttribute("block") === "") {
      // Let's normalize the tab indents
      content = content.replace(/\n/, "");
      let tabs = content.match(/\s*/);
      content = content.replace(new RegExp("\n" + tabs, "g"), "\n");
      content = content.trim();
      let p = dom.createElement("pre");
      p.appendChild(c);
      el.appendChild(p);
    } else {
      el.appendChild(c);
    }
    let highlighted = content;
    if (Prism.languages[language]) {
      c.setAttribute("class", "language-" + language);
      highlighted = Prism.highlight(content, Prism.languages[language]);
    }
    c.innerHTML = highlighted;
  });
}
