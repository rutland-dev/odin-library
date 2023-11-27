myBooks = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        pageCount: 295,
        haveRead: true
    },
    {
        title: "The Fellowship of the Ring",
        author: "J.R.R. Tolkien",
        pageCount: 428,
        haveRead: true
    },
    {
        title: "The Two Towers",
        author: "J.R.R. Tolkien",
        pageCount: 352,
        haveRead: true
    },
    {
        title: "The Return of the King",
        author: "J.R.R. Tolkien",
        pageCount: 440,
        haveRead: true
    },
    {
        title: "The Blade Itself",
        author: "Joe Abercrombie",
        pageCount: 529,
        haveRead: true
    },
    {
        title: "Before They Are Hanged",
        author: "Joe Abercrombie",
        pageCount: 539,
        haveRead: true
    },
    {
        title: "Last Argument of Kings",
        author: "Joe Abercrombie",
        pageCount: 603,
        haveRead: true
    }
]

populateCards = () => {
    let newBookId = 0;
    cardContainer = document.querySelector('#card-container');
    while (cardContainer.hasChildNodes()) {
        cardContainer.removeChild(cardContainer.firstChild);
    }
    myBooks.forEach(book => {
        newBookId = newBookId + 1;
        book.bookId = newBookId;
        newCard = document.createElement('div');
        newCard.classList.add('card');
        cardContainer.appendChild(newCard);
        cardTitle = document.createElement('div');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = book.title;
        newCard.appendChild(cardTitle);
        cardAuthor = document.createElement('div');
        cardAuthor.classList.add('card-author');
        cardAuthor.textContent = book.author;
        newCard.appendChild(cardAuthor);
        cardPageCount = document.createElement('div');
        cardPageCount.classList.add('card-page-count');
        cardPageCount.textContent = `${book.pageCount} pages`;
        newCard.appendChild(cardPageCount);
        cardHaveRead = document.createElement('d');
        cardHaveRead.classList.add('card-have-read');
        readButton = document.createElement('button');
        readButton.classList.add('read-status');
        readButton.addEventListener("click", readStatus = () => {
            if (myBooks[(book.bookId -1)].haveRead === true) {
                myBooks[(book.bookId -1)].haveRead = false;
            } else {
                myBooks[(book.bookId -1)].haveRead = true;
            }
            populateCards();
        })
        if (book.haveRead === true) {
            cardHaveRead.textContent = 'Read';
            readButton.textContent = 'Change to unread'
        } else {
            cardHaveRead.textContent = 'Unread';
            readButton.textContent = 'Change to read'
        }
        newCard.appendChild(cardHaveRead);
        newCard.appendChild(readButton);
        removeBook = document.createElement('button');
        removeBook.classList.add('remove-button');
        removeBook.textContent = "Remove Book";
        removeBook.addEventListener("click", removeBookFunction = () => {
            myBooks.splice(book.bookId - 1, 1);
            populateCards();
        });
        newCard.appendChild(removeBook);

    });
}

class Book {
    constructor(title, author, pageCount, haveRead, bookId) {
        this.title = title,
        this.author = author,
        this.pageCount = pageCount,
        this.haveRead = haveRead,
        this.bookId = bookId
    }
}

function getBook() {
    let formTitle = document.querySelector('#title').value;
    let formAuthor = document.querySelector('#author').value;
    let formPageCount = document.querySelector('#page-count').value;
    let radioButtons = document.querySelectorAll('input[name="have-read"]');
    let formHaveRead;
    for (let radioButton of radioButtons) {
        if (radioButton.checked) {
            formHaveRead = radioButton.value;
        }
    }
    varTitle = formTitle.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    addBook(varTitle, formTitle, formAuthor, formPageCount, formHaveRead);
}

function addBook(varTitle, title, author, pageCount, haveRead) {
    varTitle = new Book(title, author, pageCount, haveRead, 0);
    myBooks.push(varTitle);
    dialog.close();
    populateCards();
}



const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const cancelButton = document.querySelector("#cancel");
const submitButton = document.querySelector('#submit-book');

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
cancelButton.addEventListener("click", () => {
  dialog.close();
});

submitButton.addEventListener("click", () => getBook());

populateCards();