/* ==========================================================================
   app.js - renders everything from DATA (data.js) and wires up interactions.
   No dependencies, no build step.
   ========================================================================== */

(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  if (typeof DATA === "undefined") {
    console.error("data.js failed to load");
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------- HERO */
  $("#brandInitials").textContent = DATA.initials;
  $("#brandName").textContent = DATA.name;
  $("#heroName").textContent = DATA.name.split(" ")[0];
  $("#heroRole").textContent = DATA.role + (DATA.org ? " · " + DATA.org : "");
  $("#heroWhere").textContent = DATA.location;
  $("#heroTagline").textContent = DATA.tagline;

  // hero badge opens a pre-filled email
  (function contactBadge() {
    const C = DATA.contact;
    const link = $("#heroKickerLink");
    if (!C || !link) return;
    const qs =
      "subject=" + encodeURIComponent(C.subject || "") +
      "&body=" + encodeURIComponent((C.body || []).join("\n"));
    link.href = "mailto:" + C.email + "?" + qs;
    link.title = "Draft an email to " + C.email;
    if (C.label) $("#heroKicker").textContent = C.label;
  })();
  document.title = `${DATA.name} - ${DATA.role}`;

  const iconFor = { in: "↗", gh: "↗" };
  $("#heroCta").innerHTML = DATA.links
    .map(
      (l, i) =>
        `<a class="btn ${i === 0 ? "primary" : ""}" href="${esc(l.url)}"${
          l.url.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : ""
        }>${esc(l.label)} <span aria-hidden="true">${iconFor[l.icon] || "→"}</span></a>`
    )
    .join("");

  /* ------------------------------------------------------------- PORTRAIT */
  // If avatar.jpg is missing or fails to decode, fall back to the monogram so
  // the hero never renders a broken-image icon.
  (function portrait() {
    const fig = $("#portrait");
    const img = $("#avatar");
    if (!fig || !img) return;
    img.alt = DATA.name;
    $("#avatarFallback").textContent = DATA.initials;
    if (DATA.photo) img.src = DATA.photo;
    const fail = () => fig.classList.add("no-photo");
    img.addEventListener("error", fail);
    if (img.complete && img.naturalWidth === 0) fail();
  })();

  /* --------------------------------------------------------------- STATS */
  $("#statsWrap").innerHTML = DATA.stats
    .map(
      (s) =>
        `<div class="stat"><b data-to="${s.value}" data-suffix="${esc(s.suffix || "")}">0</b><span>${esc(
          s.label
        )}</span></div>`
    )
    .join("");

  // Count-up animation for the stat numbers.
  document.querySelectorAll(".stat b").forEach((el) => {
    const to = parseFloat(el.dataset.to);
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) {
      el.textContent = to + suffix;
      return;
    }
    let cur = 0;
    const step = Math.max(1, Math.ceil(to / 28));
    const tick = () => {
      cur = Math.min(to, cur + step);
      el.textContent = cur + suffix;
      if (cur < to) requestAnimationFrame(tick);
    };
    setTimeout(tick, 250);
  });

  /* --------------------------------------------------------------- ABOUT */
  $("#aboutWrap").innerHTML = DATA.about.map((p) => `<p>${esc(p)}</p>`).join("");

  /* ---------------------------------------------------------- EXPERIENCE */
  const extLink = (url, text, cls) =>
    `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" class="${cls || ""}">${esc(
      text
    )}<span class="ext" aria-hidden="true">↗</span></a>`;

  $("#expWrap").innerHTML = DATA.experience
    .map(
      (c) => `
      <div class="company ${c.current ? "now" : ""} reveal">
        <span class="node" aria-hidden="true"></span>
        <h3>${c.url ? extLink(c.url, c.company) : esc(c.company)}</h3>
        <div class="cmeta">${esc(c.meta || "")}</div>
        ${c.roles
          .map(
            (r) => `
          <div class="card role-card">
            <div class="role-head">
              <h4>${r.url ? extLink(r.url, r.title) : esc(r.title)}</h4>
              <span class="per">${esc(r.period)}${r.length ? " · " + esc(r.length) : ""}</span>
            </div>
            ${r.location ? `<div class="role-loc">${esc(r.location)}</div>` : ""}
            ${r.points && r.points.length ? `<ul>${r.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
            ${
              r.skills && r.skills.length
                ? `<div class="chips">${r.skills.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>`
                : ""
            }
          </div>`
          )
          .join("")}
      </div>`
    )
    .join("");

  /* -------------------------------------------------------------- SKILLS */
  const groups = ["All", ...DATA.skills.map((g) => g.group)];
  $("#filters").innerHTML = groups
    .map((g, i) => `<button class="filter ${i === 0 ? "on" : ""}" data-g="${esc(g)}">${esc(g)}</button>`)
    .join("");

  function renderSkills(group) {
    const list =
      group === "All"
        ? DATA.skills.flatMap((g) => g.items)
        : (DATA.skills.find((g) => g.group === group) || { items: [] }).items;
    $("#skillWrap").innerHTML = list
      .map((s, i) => `<span class="sk" style="animation-delay:${i * 18}ms">${esc(s)}</span>`)
      .join("");
  }
  renderSkills("All");

  $("#filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    document.querySelectorAll(".filter").forEach((b) => b.classList.toggle("on", b === btn));
    renderSkills(btn.dataset.g);
  });

  /* ------------------------------------------------------------ PROJECTS */
  $("#projWrap").innerHTML = DATA.projects
    .map(
      (p) => `
      <article class="card proj reveal">
        <h3>${esc(p.title)}</h3>
        <div class="pmeta">${esc(p.period)}${p.org ? " · " + esc(p.org) : ""}</div>
        <p>${esc(p.blurb)}</p>
        <div class="chips">${(p.tags || []).map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
      </article>`
    )
    .join("");

  /* -------------------------------------------------------------- CERTS */
  const CERT_PREVIEW = 8;
  let certsExpanded = false;

  function renderCerts() {
    const list = certsExpanded ? DATA.certifications : DATA.certifications.slice(0, CERT_PREVIEW);
    $("#certWrap").innerHTML = list
      .map(
        (c) => `
        <div class="cert ${c.featured ? "star" : ""}">
          <span class="badge" aria-hidden="true">${c.featured ? "★" : "✓"}</span>
          <div>
            <b>${esc(c.name)}</b>
            <span>${esc(c.issuer)} · ${esc(c.date)}${c.note ? " · " + esc(c.note) : ""}</span>
          </div>
        </div>`
      )
      .join("");
    $("#certToggle").textContent = certsExpanded
      ? "Show fewer"
      : `Show all ${DATA.certifications.length} certifications`;
  }
  renderCerts();
  $("#certToggle").addEventListener("click", () => {
    certsExpanded = !certsExpanded;
    renderCerts();
  });

  /* ----------------------------------------------------------- EDUCATION */
  $("#eduWrap").innerHTML = DATA.education
    .map(
      (e) => `
      <div class="card edu reveal">
        <h3>${esc(e.school)}</h3>
        <div class="d">${esc(e.degree)}</div>
        <div class="p">${esc(e.period)}</div>
        ${
          e.activities
            ? `<div class="chips" style="margin-bottom:10px">${e.activities
                .map((a) => `<span class="chip">${esc(a)}</span>`)
                .join("")}</div>`
            : ""
        }
        ${
          e.courses
            ? `<div class="chips">${e.courses.map((c) => `<span class="chip">${esc(c)}</span>`).join("")}</div>`
            : ""
        }
      </div>`
    )
    .join("");

  /* =======================================================================
     EDUCATION: rendered as an eval suite. Spine grows, cases reveal in
     sequence, score bars fill.
     ======================================================================= */
  (function evalsTree() {
    const wrap = $("#evalsWrap");
    const T = DATA.evalsTree;
    if (!wrap || !T) return;

    const nameCell = (o) =>
      o.url
        ? `<a href="${esc(o.url)}" target="_blank" rel="noopener noreferrer">${esc(o.selected)}</a>`
        : esc(o.selected);

    const chips = (arr, cls) =>
      arr.map((x) => `<span class="${cls}">${esc(x)}</span>`).join("");

    const passed = T.cases.length;
    let i = 0;

    // newest first: data.js stays chronological, the view is reversed
    const ordered = T.cases.slice().reverse();

    const rows = ordered
      .map((c) => {
        const pct = Math.round((c.score != null ? c.score : 1) * 100);
        return `
        <div class="evcase" style="--i:${i++}">
          <div class="evbody">
            <div class="ev-head">
              <span class="ev-id">${esc(c.id)}</span>
              <span class="ev-pass">pass</span>
              <span class="ev-score">
                <span class="ev-bar" style="--w:${pct}%"><i></i></span>
                ${(c.score != null ? c.score : 1).toFixed(2)}
              </span>
            </div>
            <div class="ev-sel">${nameCell(c)}</div>
            ${c.meta ? `<div class="ev-meta">${esc(c.meta)}</div>` : ""}
            ${c.detail ? `<div class="ev-detail">${esc(c.detail)}</div>` : ""}
            ${
              c.assertions && c.assertions.length
                ? `<div class="ev-row">
                     <div class="ev-row-label">assertions passed</div>
                     <div class="ev-chips">${chips(c.assertions, "ev-a")}</div>
                   </div>`
                : ""
            }
            ${
              c.candidates && c.candidates.length
                ? `<div class="ev-row">
                     <div class="ev-row-label">candidates not selected</div>
                     <div class="ev-chips">${chips(c.candidates, "ev-c")}</div>
                   </div>`
                : ""
            }
          </div>
        </div>`;
      })
      .join("");

    const v = T.verdict;
    const verdict = v
      ? `
      <div class="evcase is-verdict" style="--i:${i++}">
        <div class="evbody">
          <div class="ev-head">
            <span class="ev-id">verdict</span>
            <span class="ev-pass">pass</span>
            <span class="ev-score">
              <span class="ev-bar" style="--w:${Math.round((v.score || 1) * 100)}%"><i></i></span>
              ${(v.score || 1).toFixed(2)}
            </span>
          </div>
          <div class="ev-sel">${esc(v.label)}</div>
          ${v.meta ? `<div class="ev-meta">${esc(v.meta)}</div>` : ""}
        </div>
      </div>`
      : "";

    wrap.innerHTML =
      `<div class="ev-suite">
         <span>${esc(T.suite)}</span>
         <span class="sm">${esc(T.meta || "")}</span>
         <span class="pill">${passed}/${passed} passed</span>
       </div>` +
      `<div class="evtree" id="evtree">${verdict}${rows}</div>`;

    const tree = $("#evtree");
    if (reduceMotion) {
      tree.classList.add("grow");
      return;
    }
    new IntersectionObserver(
      (es, obs) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            tree.classList.add("grow");
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    ).observe(tree);
  })();


  /* ------------------------------------------ EDUCATION PAGE: full history */
  // School through masters. Institutions come from the eval suite (it holds
  // every stage); coursework stays in DATA.education and renders below this.
  (function eduDetail() {
    const wrap = $("#eduFullWrap");
    const T = DATA.evalsTree;
    if (!wrap || !T) return;

    wrap.innerHTML =
      '<div class="acad">' +
      T.cases
        .slice()
        .reverse()
        .map(function (c, k) {
          var name = c.url
            ? '<a href="' + esc(c.url) + '" target="_blank" rel="noopener noreferrer">' +
              esc(c.selected) + "</a>"
            : esc(c.selected);
          var gave =
            c.assertions && c.assertions.length
              ? '<div class="ev-row"><div class="ev-row-label">what it gave me</div>' +
                '<div class="ev-chips">' +
                c.assertions.map(function (a) { return '<span class="ev-a">' + esc(a) + "</span>"; }).join("") +
                "</div></div>"
              : "";
          return (
            '<div class="acad-item reveal">' +
              '<div class="acad-step">' + (k + 1) + "</div>" +
              "<div>" +
                '<div class="acad-name">' + name + "</div>" +
                (c.meta ? '<div class="acad-meta">' + esc(c.meta) + "</div>" : "") +
                (c.detail ? '<div class="acad-detail">' + esc(c.detail) + "</div>" : "") +
                gave +
              "</div>" +
            "</div>"
          );
        })
        .join("") +
      "</div>";
  })();

  /* -------------------------------------------------------------- FOOTER */
  $("#footLinks").innerHTML = DATA.links
    .map(
      (l) =>
        `<a href="${esc(l.url)}"${
          l.url.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : ""
        }>${esc(l.label)}</a>`
    )
    .join("");
  $("#footNote").innerHTML =
    '<div class="made">' + esc(DATA.footerNote) + "</div>" +
    '<div class="copy">© ' + new Date().getFullYear() + " " + esc(DATA.name) + "</div>";

  /* ------------------------------------------------- SCROLL REVEAL + NAV */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // Scroll progress bar. Nav highlighting is owned by the router.
  const progress = $("#progress");

  function onScroll() {
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------ MOUSE SPOTLIGHT */
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    window.addEventListener(
      "pointermove",
      (e) => {
        document.documentElement.style.setProperty("--mx", e.clientX + "px");
        document.documentElement.style.setProperty("--my", e.clientY + "px");
      },
      { passive: true }
    );
  }

  /* =======================================================================
     AI: neural network canvas in the hero
     ======================================================================= */
  (function neuralNet() {
    const cv = $("#nn");
    if (!cv || reduceMotion) return;
    const ctx = cv.getContext("2d");
    const LAYERS = [4, 7, 7, 3];
    let nodes = [], pulses = [], w = 0, h = 0, dpr = 1, running = true;

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight || 420;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = [];
      LAYERS.forEach((count, li) => {
        const x = (w / (LAYERS.length + 1)) * (li + 1);
        for (let i = 0; i < count; i++) {
          nodes.push({
            x,
            y: (h / (count + 1)) * (i + 1),
            l: li,
            r: 2.4 + Math.random() * 1.4,
            ph: Math.random() * Math.PI * 2,
          });
        }
      });
    }

    function spawn() {
      const from = nodes.filter((n) => n.l < LAYERS.length - 1);
      if (!from.length) return;
      const a = from[(Math.random() * from.length) | 0];
      const next = nodes.filter((n) => n.l === a.l + 1);
      const b = next[(Math.random() * next.length) | 0];
      pulses.push({ a, b, t: 0, sp: 0.008 + Math.random() * 0.014 });
    }

    let last = 0;
    function frame(ts) {
      if (!running) return;
      requestAnimationFrame(frame);
      if (ts - last < 1000 / 40) return; // cap ~40fps
      last = ts;

      ctx.clearRect(0, 0, w, h);

      // edges
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(124,92,255,0.16)";
      ctx.beginPath();
      nodes.forEach((n) => {
        if (n.l >= LAYERS.length - 1) return;
        nodes.forEach((m) => {
          if (m.l !== n.l + 1) return;
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
        });
      });
      ctx.stroke();

      // nodes
      const t = ts / 900;
      nodes.forEach((n) => {
        const glow = 0.55 + 0.45 * Math.sin(t + n.ph);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + glow, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${0.25 + glow * 0.4})`;
        ctx.fill();
      });

      // pulses travelling along edges
      if (pulses.length < 26 && Math.random() < 0.5) spawn();
      pulses = pulses.filter((p) => {
        p.t += p.sp;
        if (p.t >= 1) return false;
        const e = p.t * p.t * (3 - 2 * p.t); // smoothstep
        const x = p.a.x + (p.b.x - p.a.x) * e;
        const y = p.a.y + (p.b.y - p.a.y) * e;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
        g.addColorStop(0, "rgba(244,114,182,0.95)");
        g.addColorStop(1, "rgba(244,114,182,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });
    }

    build();
    requestAnimationFrame(frame);
    window.addEventListener("resize", build);

    // pause when the hero scrolls out of view (saves battery)
    new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting && !running) {
          running = true;
          requestAnimationFrame(frame);
        } else if (!e.isIntersecting) {
          running = false;
        }
      });
    }).observe($("#hero"));
  })();

  /* =======================================================================
     Hero terminal: types AI / Kubernetes commands on a loop
     ======================================================================= */
  (function typer() {
    const el = $("#typed");
    if (!el) return;
    const lines = [
      "kubectl get pods -n production",
      "eksctl upgrade cluster --name prod --approve",
      "aws bedrock invoke-model --model-id anthropic.claude",
      "kubectl rollout status deploy/inference-gateway",
      "aws sagemaker describe-endpoint --endpoint-name rag-api",
      "helm upgrade --install observability ./charts",
    ];
    if (reduceMotion) {
      el.textContent = lines[0];
      return;
    }
    let li = 0, ci = 0, deleting = false;
    (function tick() {
      const line = lines[li];
      if (!deleting) {
        el.textContent = line.slice(0, ++ci);
        if (ci === line.length) {
          deleting = true;
          return setTimeout(tick, 1600);
        }
        return setTimeout(tick, 34 + Math.random() * 45);
      }
      el.textContent = line.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        li = (li + 1) % lines.length;
        return setTimeout(tick, 320);
      }
      setTimeout(tick, 16);
    })();
  })();

  /* =======================================================================
     Tech marquee
     ======================================================================= */
  (function marquee() {
    const el = $("#marquee");
    if (!el) return;
    const terms = [
      "Kubernetes", "Amazon EKS", "Generative AI", "Amazon Bedrock", "RAG",
      "Terraform", "Observability", "Chaos Engineering", "SageMaker",
      "Well-Architected", "Cost Optimization", "CI/CD", "Resilience",
      "Amazon Q", "Data Analytics",
    ];
    // duplicated once so the -50% translate loops seamlessly
    el.innerHTML = [...terms, ...terms].map((t) => `<span>${esc(t)}</span>`).join("");
  })();

  /* =======================================================================
     KUBERNETES: career as clusters (companies) and nodes (roles)
     ======================================================================= */
  (function careerCluster() {
    const wrap = $("#clusterWrap");
    const log = $("#kubelog");
    if (!wrap) return;

    const startYear = (p) => {
      const m = String(p).match(/(\d{4})/);
      return m ? +m[1] : 0;
    };
    const slug = (s) =>
      String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 28);

    // Companies become clusters, roles become nodes inside them.
    // Read straight from DATA.experience so nothing is duplicated.
    const clusters = DATA.experience.map((c) => ({
      name: c.company,
      ctx: slug(c.company),
      meta: c.meta || "",
      url: c.url || "",
      zone: c.zone || "",
      nodes: c.roles.map((r) => ({
        tag: r.short || (r.title.match(/\b[A-Z]/g) || ["N"]).join("").slice(0, 4),
        title: r.title,
        period: r.period,
        year: startYear(r.period),
        current: /present/i.test(r.period),
        // a role's skills become the containers running on that node
        containers: r.skills || [],
        host: "node/" + slug(r.short || r.title) + "-" + startYear(r.period),
      })),
    }));

    // chronological order of every node, for the replay
    const seq = [];
    clusters.forEach((cl, ci) => cl.nodes.forEach((n, ni) => seq.push({ ci, ni, y: n.year })));
    seq.sort((a, b) => a.y - b.y);

    const totalNodes = seq.length;
    if ($("#clusterCount")) $("#clusterCount").textContent = clusters.length;
    if ($("#clusterRoleCount")) $("#clusterRoleCount").textContent = totalNodes;

    // ---- render vpc > subnet > cluster --------------------------------------
    // Two VPCs (US and India). The US VPC holds two subnets: Boston/Acton for
    // 2018-2020, Dallas for everything after 2020.
    const VPCS = DATA.vpcs || [];
    const CP = DATA.controlPlane || [];

    const clusterCard = (cl, ci) => `
      <div class="ccluster" data-c="${ci}">
        <div class="cc-kind">cluster</div>
        <div class="cc-head">
          <span class="ok" aria-hidden="true"></span>
          ${
            cl.url
              ? `<a href="${esc(cl.url)}" target="_blank" rel="noopener noreferrer">cluster/${esc(cl.ctx)}</a>`
              : `<span class="nm">cluster/${esc(cl.ctx)}</span>`
          }
          <span class="cnt" data-cnt="${ci}"></span>
        </div>
        <div class="cc-meta">${esc(cl.meta)}</div>
        <div class="cnodes" data-nodes="${ci}"></div>
      </div>`;

    const subnetBlock = (sn) => {
      const mine = clusters
        .map((cl, ci) => ({ cl, ci }))
        .filter((x) => (x.cl.zone || "") === sn.zone);
      if (!mine.length) return "";
      const nodeCount = mine.reduce((a, x) => a + x.cl.nodes.length, 0);
      return `
        <div class="subnet">
          <div class="sn-tab">${esc(sn.id)}<span>${esc(sn.cidr)}</span></div>
          <div class="vpc-meta">${esc(sn.label || "")}  |  ${mine.length} clusters, ${nodeCount} nodes</div>
          <div class="clusters">${mine.map((x) => clusterCard(x.cl, x.ci)).join("")}</div>
        </div>`;
    };

    wrap.innerHTML =
      `<div class="cplane">
         <div class="cplane-tag">control plane</div>
         ${CP.map(
           (c, k) => `<div class="cp-item" data-cp="${k}"><b>${esc(c.k)}</b><span>${esc(c.v)}</span></div>`
         ).join("")}
       </div>` +
      VPCS.map(
        (v, vi) => `
        <div class="vpc" data-v="${vi}">
          <div class="vpc-tab">${esc(v.name)}<span>${esc(v.cidr)}</span></div>
          <div class="vpc-meta">${esc(v.meta || "")}</div>
          <div class="subnets">${(v.subnets || []).map(subnetBlock).join("")}</div>
        </div>`
      ).join("") +
      (function orphans() {
        const known = VPCS.flatMap((v) => (v.subnets || []).map((s) => s.zone));
        const lost = clusters.map((cl, ci) => ({ cl, ci })).filter((x) => known.indexOf(x.cl.zone) < 0);
        if (!lost.length) return "";
        return `
          <div class="vpc" data-v="orphan">
            <div class="vpc-tab">unassigned<span>no matching subnet</span></div>
            <div class="vpc-meta">These companies have a zone that no subnet claims. Fix their
              <code>zone</code> in data.js.</div>
            <div class="subnets"><div class="subnet">
              <div class="clusters">${lost.map((x) => clusterCard(x.cl, x.ci)).join("")}</div>
            </div></div>
          </div>`;
      })();

    const cpEls = [...wrap.querySelectorAll("[data-cp]")];
    const setCp = (k, val, busy) => {
      const e = cpEls[k];
      if (!e) return;
      e.querySelector("span").textContent = val;
      e.classList.toggle("busy", !!busy);
    };

    const cardEls = [...wrap.querySelectorAll(".ccluster")];
    const gridEls = [...wrap.querySelectorAll(".cnodes")];
    const cntEls = [...wrap.querySelectorAll("[data-cnt]")];

    // Render all nodes up front so the grid never reflows mid-animation.
    clusters.forEach((cl, ci) => {
      cntEls[ci].textContent = cl.nodes.length + (cl.nodes.length === 1 ? " node" : " nodes");
      cl.nodes.forEach((n) => {
        const el = document.createElement("div");
        el.className = "nd";
        el.setAttribute("data-kind", "node");
        const ctrs = n.containers.length
          ? '<div class="ctrs">' +
            n.containers.map((s) => '<span class="ctr">' + esc(s) + "</span>").join("") +
            "</div>"
          : '<div class="ctrs empty"><span>no workloads recorded</span></div>';
        el.className = "nd ready";
        el.innerHTML =
          '<div class="nd-kind">node</div>' +
          '<div class="nd-top">' +
            '<span class="bulb" aria-hidden="true"></span>' +
            '<span class="nd-host">' + esc(n.host) + "</span>" +
            '<span class="st">ready</span>' +
          "</div>" +
          '<div class="nd-title">' + esc(n.title) + "</div>" +
          '<div class="nd-period">' + esc(n.period) + "</div>" +
          '<div class="ctrs-label">containers &middot; ' + n.containers.length + "</div>" +
          ctrs;
        gridEls[ci].appendChild(el);
        n.el = el;
        n.st = el.querySelector(".st");
      });
    });

    const say = (m) => { if (log) log.textContent = m; };
    const setState = (n, cls, label) => {
      n.el.className = "nd " + cls;
      n.st.textContent = label;
    };

    function settle() {
      clusters.forEach((cl) =>
        cl.nodes.forEach((n) =>
          n.current ? setState(n, "current", "ready") : setState(n, "ready", "ready")
        )
      );
      cardEls.forEach((c, ci) => {
        c.classList.remove("active");
        c.classList.toggle("live", clusters[ci].nodes.some((n) => n.current));
      });
      const cur = clusters.flatMap((c) => c.nodes).filter((n) => n.current);
      setCp(1, "idle", false);
      setCp(2, totalNodes + " nodes", false);
      say(
        clusters.length + " clusters, " + totalNodes + " nodes, " + cur.length + " Ready" +
          (cur.length ? "  <  " + cur[0].title : "")
      );
    }

    if (reduceMotion) {
      settle();
      return;
    }

    let i = 0, timer = null, playing = false;

    function step() {
      if (i >= seq.length) {
        settle();
        clearInterval(timer);
        timer = null;
        playing = false;
        setTimeout(() => { i = 0; start(); }, 9000); // loop the story
        return;
      }
      const s = seq[i++];
      const cl = clusters[s.ci];
      const n = cl.nodes[s.ni];

      cardEls.forEach((c, k) => c.classList.toggle("active", k === s.ci));
      setState(n, "joining focus", "joining");
      setCp(1, "binding " + n.tag.toLowerCase(), true);
      setCp(2, i + " nodes", false);
      say(n.host + " joining cluster/" + cl.ctx);

      setTimeout(() => {
        setState(n, "ready focus", "ready");
        say(n.host + " status Ready  <  " + n.title + ", " + cl.name);
      }, 620);

      setTimeout(() => {
        if (n.current) {
          setState(n, "current", "ready");
        } else {
          setState(n, "ready", "ready");
          say(n.host + " status Ready, workloads steady  <  " + n.period);
        }
      }, 1500);
    }

    function start() {
      if (playing) return;
      playing = true;
      clusters.forEach((cl) => cl.nodes.forEach((n) => setState(n, "ready", "ready")));
      cardEls.forEach((c) => c.classList.remove("live", "active"));
      say("replaying career across " + clusters.length + " clusters");
      step();
      timer = setInterval(step, 1750);
    }

    new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            start();
          } else if (timer) {
            clearInterval(timer);
            timer = null;
            playing = false;
            settle();
          }
        });
      },
      { threshold: 0.15 }
    ).observe(wrap);
  })();


  /* =======================================================================
     AI/ML: mock RAG inference pipeline with token streaming
     ======================================================================= */
  (function ragPipeline() {
    const stagesEl = $("#ragStages");
    const qEl = $("#ragQ");
    const aEl = $("#ragA");
    const telEl = $("#ragTel");
    const caret = $("#ragCaret");
    if (!stagesEl || !DATA.aiQA) return;

    const STAGES = [
      { k: "prompt", d: "tokenize" },
      { k: "embed", d: "titan-v2" },
      { k: "retrieve", d: "top-k search" },
      { k: "augment", d: "build context" },
      { k: "generate", d: "claude" },
    ];

    stagesEl.innerHTML = STAGES.map(
      (s) => `<div class="stage"><b>${esc(s.k)}</b><span>${esc(s.d)}</span></div>`
    ).join("");
    const stageEls = [...stagesEl.querySelectorAll(".stage")];

    const qa = DATA.aiQA;
    let qi = 0;
    let timers = [];
    const clearAll = () => { timers.forEach(clearTimeout); timers = []; };
    const after = (ms, fn) => timers.push(setTimeout(fn, ms));

    function telemetry(item, tokens, ms) {
      telEl.innerHTML =
        `<span>model <b>anthropic.claude</b></span>` +
        `<span>chunks retrieved <b>${item.chunks}</b></span>` +
        `<span>tokens <b>${tokens}</b></span>` +
        `<span>latency <b>${ms} ms</b></span>`;
    }

    function run() {
      clearAll();
      const item = qa[qi];
      qi = (qi + 1) % qa.length;

      stageEls.forEach((s) => (s.className = "stage"));
      aEl.textContent = "";
      qEl.textContent = "";
      caret.style.display = "";

      // 1. type the question
      let ci = 0;
      (function typeQ() {
        qEl.textContent = item.q.slice(0, ++ci);
        if (ci < item.q.length) return after(26, typeQ);
        after(260, walk);
      })();

      // 2. light each pipeline stage in turn
      function walk() {
        let si = 0;
        (function next() {
          if (si > 0) stageEls[si - 1].className = "stage done";
          if (si >= stageEls.length) return after(180, stream);
          stageEls[si].className = "stage lit";
          si++;
          after(430, next);
        })();
      }

      // 3. stream the answer back in token-ish chunks
      function stream() {
        const words = item.a.split(" ");
        let wi = 0;
        const t0 = performance.now();
        (function tok() {
          aEl.textContent = words.slice(0, ++wi).join(" ");
          if (wi < words.length) {
            telemetry(item, Math.round(wi * 1.4), Math.round(performance.now() - t0));
            return after(46 + Math.random() * 40, tok);
          }
          telemetry(item, Math.round(words.length * 1.4), Math.round(performance.now() - t0));
          stageEls.forEach((s) => (s.className = "stage done"));
          caret.style.display = "none";
          after(4200, run); // next question
        })();
      }
    }

    if (reduceMotion) {
      const item = qa[0];
      qEl.textContent = item.q;
      aEl.textContent = item.a;
      caret.style.display = "none";
      stageEls.forEach((s) => (s.className = "stage done"));
      telemetry(item, Math.round(item.a.split(" ").length * 1.4), 380);
      return;
    }

    let started = false;
    new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            run();
          } else if (!e.isIntersecting && started) {
            started = false;
            clearAll();
          }
        });
      },
      { threshold: 0.3 }
    ).observe($("#rag"));
  })();

  /* =======================================================================
     3D tilt on project cards
     ======================================================================= */
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll("#projWrap .card").forEach((card) => {
      card.classList.add("tilt");
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(700px) rotateY(${px * 11}deg) rotateX(${
          -py * 11
        }deg) translateY(-6px) scale(1.02)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* =======================================================================
     ROUTER
     Hash based (#/experience) so refresh and deep links work on GitHub Pages
     with no server rewrites. Each .page[data-route] is a screen.
     ======================================================================= */
  (function router() {
    const pages = [...document.querySelectorAll(".page[data-route]")];
    const navA = [...document.querySelectorAll("#navLinks a")];
    if (!pages.length) return;

    function routeOf() {
      var h = (location.hash || "").replace(/^#/, "");
      if (!h || h === "/") return "/";
      return h.charAt(0) === "/" ? h : "/" + h;
    }

    function apply() {
      var want = routeOf();
      var match = pages.find(function (p) { return p.dataset.route === want; }) || pages[0];

      pages.forEach(function (p) { p.classList.toggle("active", p === match); });
      navA.forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + match.dataset.route);
      });

      var label = match.dataset.route === "/" ? "" : match.dataset.route.slice(1);
      document.title =
        DATA.name +
        (label ? " - " + label.charAt(0).toUpperCase() + label.slice(1) : " - " + DATA.role);

      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });

      // reveal whatever is already in view on the freshly shown page, and let
      // the hero canvas re-measure now that it has a real width again
      requestAnimationFrame(function () {
        match.querySelectorAll(".reveal").forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("in");
        });
        window.dispatchEvent(new Event("resize"));
        onScroll();
      });
    }

    window.addEventListener("hashchange", apply);
    apply();

    // each cluster card on the home page opens the experience write-up
    document.querySelectorAll("#clusterWrap .ccluster").forEach(function (card) {
      card.classList.add("linked");
      card.addEventListener("click", function (e) {
        if (e.target.closest("a")) return; // let real links through
        location.hash = "#/experience";
      });
    });
  })();

  /* ---------------------------------------------------------- THEME TOGGLE */
  const saved = localStorage.getItem("theme");
  if (saved) document.documentElement.dataset.theme = saved;
  $("#themeBtn").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  });
})();
