document.addEventListener("click", (event) => {
  let curr = <HTMLElement | null>event.target;
  while (curr && curr.parentElement) {
    if (
      curr.getAttribute("role") == "menuitem" &&
      curr.parentElement.children[0] == curr
    ) {
      const link = <HTMLAnchorElement>(
        Array.from(
          document.getElementsByClassName(
            "oajrlxb2 gs1a9yip g5ia77u1 mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x tgvbjcpo hpfvmrgz jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h esuyzwwr f1sip0of du4w35lb n00je7tq arfg74bv qs9ysxi8 k77z8yql btwxx1t3 abiwlrkh p8dawk7l lzcic4wl a8c37x1j tm8avpzi"
          )
        ).filter((element) => element.getBoundingClientRect().y > 0)[0]
      );

      if (link) {
        chrome.runtime.sendMessage({ type: "post", body: { link: link.href } });
      }
      break;
    }
    curr = curr.parentElement;
  }
});

export {};
