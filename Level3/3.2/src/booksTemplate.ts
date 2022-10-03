import * as path from 'path';
import * as fs from 'fs';

import { db } from './models/db';

const getBooksStr = fs.readFileSync('./sqlScripts/get_books-page.sql').toString()

const getBooksLength = fs.readFileSync('./sqlScripts/get_books_length.sql').toString()

/**
 * max offset on single page
 */
export const offsetLimit = 20

/**
 * min offset on single page
 */
export const minOffset = 10

/**
 * max offset change by pagination
 */
export const offsetShift = 10

/**
 * 
 * @param offset number of books to read
 * @param bookHost full url for books page
 * @returns HTML template
 */
export async function makeBooksPage(
    offset: number,
    bookHost: string,
    orderSQL?: string
): Promise<string> {

    // Getting first property of object like: [{'...': number}]
    let maxOffset = Object.values((await db(getBooksLength))[0])[0]

    let books = await db(getBooksStr
        .concat(orderSQL ? ' \n'.concat(orderSQL) : '')
        .concat(` \nLIMIT ${offset > offsetLimit ? offsetLimit : 0
            }, ${offset
            }`)) as bookType[]

    /**
     * String with HTML code blocks of {offset: number} of books to display on current page
     * 
     * books.length = offset
     */
    let booksBlocks: string = books
        .map(b => bookPreviewHTMLBlock(b, bookHost)).join('\n')

    return fs.readFileSync(path.join(__dirname, '../frontend/books-page/books-page.html'), 'utf-8')
        .replace(/<!--\s*id="content"\s*-->/, booksBlocks)
        .replace(
            /\.\/books-page_files\//g,
            'http://localhost:3000/books-page/books-page_files/')
        .replace(/[\n\r].*const\s+offsetLimit\s*=\s*\d+/, `const offsetLimit = ${offsetLimit}\n`)
        .replace(/[\n\r].*const\s+maxOffset\s*=\s*\d+/, `const maxOffset = ${maxOffset}\n`)
        .replace(/[\n\r].*const\s+minOffset\s*=\s*\d+/, `const minOffset = ${minOffset}\n`)
        .replace(/[\n\r].*const\s+offsetShift\s*=\s*\d+/, `const offsetShift = ${offsetShift}\n`)
        .replace(/[\n\r].*const\s+offset\s*=\s*\d+/, `const offset = ${offset}\n`)
}

export type bookType = {
    id: number | string,
    authors: string,
    year: number | string,
    pages: number | string,
    isbn: string,
    img: string,
    imgHD: string,
    title: string,
    description: string
}

function bookPreviewHTMLBlock(book: bookType, host: string): string {
    return `<div data-book-id=\"${book.id}\" class="book_item col-xs-6 col-sm-3 col-md-2 col-lg-2">
 <div class="book">
     <a href=\"${host + book.id}\"><img src=\"${book.imgHD ? book.imgHD : book.img}\" alt=\"${book.title}\">
         <div data-title=\"${book.title}\" class="blockI" style="height: 46px;">
             <div data-book-title=\"${book.title}\" class="title size_text">${book.title}</div>
             <div data-book-author=\"${book.authors}\" class="author">${book.authors}</div>
         </div>
     </a>
     <a href=\"${host + book.id}\">
         <button type="button" class="details btn btn-success">Читать</button>
     </a>
 </div>
</div>`
}