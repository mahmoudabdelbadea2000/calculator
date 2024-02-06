const toggleElement = document.querySelector(".themes__toggle");

const toggleDarkTheme = () => toggleElement.classList.toggle("themes__toggle--isActive");
const toggleDarkThemeWithEnter = (event) => event.key === "Enter" && toggleDarkTheme();

toggleElement.addEventListener("click", toggleDarkTheme);
toggleElement.addEventListener("keydown", toggleDarkThemeWithEnter);

let storeNumber = "", currentNumber = "", operation = ""

const resultElement = document.querySelector(".calc__result")
const keyElements = document.querySelectorAll("[data-type]")

const updateScreen = (value) => {
    resultElement.innerText = !value ? "0" : value
}

const numberButtonHandler = (value) => {
    if (value === "." && currentNumber.includes(".")) return
    if (value === "0" && !currentNumber) return

    currentNumber += value
    updateScreen(currentNumber)
}

const resetHandler = () => {
    storeNumber = "", currentNumber = "", operation = ""
    updateScreen(currentNumber)
}

const deleteHandler = () => {
    if (!currentNumber || currentNumber === "0") return
    if (currentNumber.length === 1) {
        currentNumber = ""
    } else {
        currentNumber = currentNumber.substring(0, currentNumber.length - 1)
    }
    updateScreen(currentNumber)
}

const executeOperation = () => {
    if (currentNumber && storeNumber && operation) {
        switch (operation) {
            case "+":
                storeNumber = parseFloat( storeNumber) + parseFloat(currentNumber)
                break;
            
                case "-":
                storeNumber = parseFloat( storeNumber) - parseFloat(currentNumber)
                break;
                
                case "*":
                storeNumber = parseFloat( storeNumber) * parseFloat(currentNumber)
                break;

                case "/":
                storeNumber = parseFloat( storeNumber) / parseFloat(currentNumber)
                break;
        }
        currentNumber = ""
        updateScreen(storeNumber)
    }
}

const operatoinHandler = (operationValue) => {
    if (!currentNumber && !storeNumber) return

    if (currentNumber && !storeNumber) {
        storeNumber = currentNumber
        currentNumber = ""
        operation = operationValue
    } else if (storeNumber) {
        operation = operationValue
        if (currentNumber) executeOperation()
    }
}

const keyElementHandler = (element) => {
    element.addEventListener("click", () => {
        const type = element.dataset.type

        if (type === "number") {
            numberButtonHandler(element.dataset.value)
        } else if (type === "operation") {
            switch (element.dataset.value) {
                case "c":
                    resetHandler()
                    break;
                case "Backspace":
                    deleteHandler()
                    break;
                case "Enter":
                    executeOperation(element.dataset.value)
                    break;
                default:
                    operatoinHandler(element.dataset.value)
            }
        }
    })
}

keyElements.forEach(numBtn => {
    keyElementHandler(numBtn)
})

// use keyboard  keys

const avalibleNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
const avalibleOperations = ["+", "-", "*", "/"]
const avalibleKeys = [...avalibleNumbers, ...avalibleOperations, "c", "Enter", "Backspace"]

const keyboardKeyDown = (key) => {
    if (avalibleKeys.includes(key)) {
        const elem = document.querySelector(`[data-value="${key}"]`)

        elem.classList.add("hover")
        elem.click()
        setTimeout(() => elem.classList.remove("hover"), 100)
    }
}

window.addEventListener("keydown", (event) => {
    keyboardKeyDown(event.key)
})