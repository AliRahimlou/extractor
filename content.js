(function() {
    const nameContractPairs = [];
    const nameRegex = /Name:\s*(.*\(.*\) \(.*GEM\))/;
    const contractRegex = /Contract:\s*([^\s]+pump)/;

    function extractDataFromElements(elements) {
        elements.forEach((element) => {
            if (element.textContent.includes("Name:") && element.textContent.includes("GEM)")) {
                const nameMatch = element.textContent.match(nameRegex);
                if (nameMatch) {
                    const name = nameMatch[1].trim();
                    let sibling = element.nextElementSibling;
                    while (sibling) {
                        const contractMatch = sibling.textContent.match(contractRegex);
                        if (contractMatch) {
                            const contractKey = contractMatch[1];
                            nameContractPairs.push({ name, contractKey });
                            console.log(`Name: ${name}, Contract: ${contractKey}`);
                            break;
                        }
                        sibling = sibling.nextElementSibling;
                    }
                }
            }
        });
    }

    // Initial extraction from existing elements
    const elements = document.querySelectorAll('*');
    extractDataFromElements(elements);

    // Observe new elements being added to the DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    extractDataFromElements([node]);
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
