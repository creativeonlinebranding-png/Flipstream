document.addEventListener("DOMContentLoaded", async () => {

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

        // Import menu styles
        menuDocument.querySelectorAll("style").forEach(style => {
            document.head.appendChild(
                document.importNode(style, true)
            );
        });

        // Import menu elements
        [...menuDocument.body.children].forEach(element => {
            if (element.tagName !== "SCRIPT") {
                document.body.appendChild(
                    document.importNode(element, true)
                );
            }
        });

        // Reconnect menu functionality
        const button = document.getElementById("menuButton");
        const drawer = document.getElementById("menuDrawer");
        const overlay = document.getElementById("menuOverlay");

        function closeMenu() {
            button.classList.remove("active");
            drawer.classList.remove("active");
            overlay.classList.remove("active");
            button.setAttribute("aria-expanded", "false");
        }

        button.addEventListener("click", () => {
            const opening = !drawer.classList.contains("active");

            button.classList.toggle("active", opening);
            drawer.classList.toggle("active", opening);
            overlay.classList.toggle("active", opening);

            button.setAttribute("aria-expanded", opening);
        });

        overlay.addEventListener("click", closeMenu);

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") closeMenu();
        });

    } catch (error) {
        console.error("FlipStream menu error:", error);
    }

});