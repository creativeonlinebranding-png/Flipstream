document.addEventListener("DOMContentLoaded", async () => {

    // HIDE .HTML FROM THE BROWSER ADDRESS BAR
    const cleanURLs = {
        "/index.html": "/",
        "/artists.html": "/artists",
        "/privacy-policy.html": "/privacy-policy"
    };

    const currentPath = window.location.pathname;

    if (cleanURLs[currentPath]) {
        window.history.replaceState(
            {},
            document.title,
            cleanURLs[currentPath]
        );
    }


    try {

        const response = await fetch("menu.html");

        if (!response.ok) {
            throw new Error("Menu could not be loaded");
        }

        const html = await response.text();

        const parser = new DOMParser();

        const menuDocument = parser.parseFromString(
            html,
            "text/html"
        );


        // Load menu CSS
        menuDocument.querySelectorAll("style").forEach(style => {

            document.head.appendChild(
                document.importNode(style, true)
            );

        });


        // Load menu HTML
        [...menuDocument.body.children].forEach(element => {

            if (element.tagName !== "SCRIPT") {

                document.body.appendChild(
                    document.importNode(element, true)
                );

            }

        });


        // Find menu elements
        const button = document.getElementById("menuButton");

        const drawer = document.getElementById("menuDrawer");

        const overlay = document.getElementById("menuOverlay");


        if (!button || !drawer || !overlay) {
            throw new Error("Menu elements missing");
        }


        // Open menu
        function openMenu() {

            button.classList.add("active");

            drawer.classList.add("active");

            overlay.classList.add("active");

            button.setAttribute("aria-expanded", "true");

        }


        // Close menu
        function closeMenu() {

            button.classList.remove("active");

            drawer.classList.remove("active");

            overlay.classList.remove("active");

            button.setAttribute("aria-expanded", "false");

        }


        // Hamburger toggle
        button.addEventListener("click", () => {

            if (drawer.classList.contains("active")) {

                closeMenu();

            } else {

                openMenu();

            }

        });


        // Close when clicking outside
        overlay.addEventListener("click", closeMenu);


        // Close when selecting a menu link
        drawer.querySelectorAll(".menuLink").forEach(link => {

            link.addEventListener("click", closeMenu);

        });


        // Close using Escape
        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                closeMenu();

            }

        });


    } catch (error) {

        console.error("FlipStream navigation error:", error);

    }

});