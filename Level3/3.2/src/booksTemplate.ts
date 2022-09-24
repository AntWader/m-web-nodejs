import * as path from 'path';
import * as fs from 'fs';

/**
 * max offset on single page
 */
const offsetLimit = 20

/**
 * min offset on single page
 */
const minOffset = 10

/**
 * max offset change by pagination
 */
const offsetShift = 10

/**
 * 
 * @param books an array of objects with book info & data
 * @param maxOffset max number of books to read
 * @returns HTML template
 */
export function makeBooksPage(books: bookType[], maxOffset: number): string {
    /**
     * String with HTML code blocks of {offset: number} of books to display on current page
     * 
     * books.length = offset
     */
    let booksBlocks: string = books
        .slice(
            books.length > offsetLimit ? offsetLimit : 0,
            books.length)
        .map(b => bookPreviewHTMLBlock(b)).join('\n')

    return fs.readFileSync(path.join(__dirname, '../frontend/books-page/books-page.html'), 'utf-8')
        .replace(/<!--\s*id="content"\s*-->/, booksBlocks)
        .replace(
            /\.\/books-page_files\//g,
            'http://localhost:3000/books-page/books-page_files/')
        .replace(/[\n\r].*const\s+offsetLimit\s+=\s*\d+/, `const offsetLimit = ${offsetLimit}\n`)
        .replace(/[\n\r].*const\s+maxOffset\s+=\s*\d+/, `const maxOffset = ${maxOffset}\n`)
        .replace(/[\n\r].*const\s+minOffset\s+=\s*\d+/, `const minOffset = ${minOffset}\n`)
        .replace(/[\n\r].*const\s+offsetShift\s+=\s*\d+/, `const offsetShift = ${offsetShift}\n`)
        .replace(/[\n\r].*const\s+offset\s+=\s*\d+/, `const offset = ${books.length}\n`)
}

export type bookType = {
    id: number | string,
    author: string,
    year: number | string,
    pages: number | string,
    isbn: string,
    data: {
        imgSrc: string,
        imgHDSrc: string,
        title: string,
        description: string,
        href: string
    }
} & Record<string, any>

function bookPreviewHTMLBlock(book: bookType): string {
    return `<div data-book-id=\"${book.id}\" class="book_item col-xs-6 col-sm-3 col-md-2 col-lg-2">
 <div class="book">
     <a href=\"${book.data.href}\"><img src=\"${book.data.imgSrc}\" alt=\"${book.data.title}\">
         <div data-title=\"${book.data.title}\" class="blockI" style="height: 46px;">
             <div data-book-title=\"${book.data.title}\" class="title size_text">${book.data.title}</div>
             <div data-book-author=\"${book.author}\" class="author">${book.author}</div>
         </div>
     </a>
     <a href=\"${book.data.href}\">
         <button type="button" class="details btn btn-success">Читать</button>
     </a>
 </div>
</div>`
}