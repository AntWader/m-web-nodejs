import * as path from 'path';
import * as fs from 'fs';

import { bookType } from './booksTemplate';

/**
 * 
 * @param book object with book info & data
 * @returns HTML template
 */
export function makeBookPage(book: bookType): string {
    /**
     * String with HTML code blocks of {offset: number} of books to display on current page
     * 
     * books.length = offset
     */
    let bookBlock: string = bookPreviewHTMLBlock(book)

    return fs.readFileSync(path.join(__dirname, '../frontend/book-page/book-page.html'), 'utf-8')
        .replace(/<!--\s*id="content"\s*-->/, bookBlock)
        .replace(
            /\.\/book-page_files\//g,
            'http://localhost:3000/book-page/book-page_files/')
        .replace(
            /\.\/books-page_files\//g,
            'http://localhost:3000/books-page/books-page_files/')
}

function bookPreviewHTMLBlock(book: bookType): string {
    return `<div id="id" book-id=\"${book.id}\">
<div id="bookImg" class="col-xs-12 col-sm-3 col-md-3 item" style="margin:0px;">
    <img src=\"${book.img}\" alt="Responsive image" class="img-responsive">
    <hr>
</div>
<div class="col-xs-12 col-sm-9 col-md-9 col-lg-9 info">
    <div class="bookInfo col-md-12">
        <div id="title" class="titleBook">${book.title}</div>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="bookLastInfo">
            <div class="bookRow"><span class="properties">автор:</span><span id="author">${book.authors}</span></div>
            <div class="bookRow"><span class="properties">год:</span><span id="year">${book.year}</span>
            </div>
            <div class="bookRow"><span class="properties">страниц:</span><span id="pages">${book.pages}</span>
            </div>
            <div class="bookRow"><span class="properties">isbn:</span><span id="isbn"></span>${book.isbn}</div>
        </div>
    </div>
    <div class="btnBlock col-xs-12 col-sm-12 col-md-12">
        <button type="button" class="btnBookID btn-lg btn btn-success">Хочу читать!</button>
    </div>
    <div class="bookDescription col-xs-12 col-sm-12 col-md-12 hidden-xs hidden-sm">
        <h4>О книге</h4>
        <hr>
        <p id="description">${book.description}</p>
    </div>
</div>
<div class="bookDescription col-xs-12 col-sm-12 col-md-12 hidden-md hidden-lg">
    <h4>О книге</h4>
    <hr>
    <p class="description">${book.description}</p>
</div>
</div>`
}