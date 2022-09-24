"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeBooksPage = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
/**
 * max offset on single page
 */
const offsetLimit = 20;
/**
 * min offset on single page
 */
const minOffset = 10;
/**
 * max offset change by pagination
 */
const offsetShift = 10;
/**
 *
 * @param books an array of objects with book info & data
 * @param maxOffset max number of books to read
 * @returns HTML template
 */
function makeBooksPage(books, maxOffset) {
    /**
     * String with HTML code blocks of {offset: number} of books to display on current page
     *
     * books.length = offset
     */
    let booksBlocks = books
        .slice(books.length > offsetLimit ? offsetLimit : 0, books.length)
        .map(b => bookPreviewHTMLBlock(b)).join('\n');
    return fs.readFileSync(path.join(__dirname, '../frontend/books-page/books-page.html'), 'utf-8')
        .replace(/<!--\s*id="content"\s*-->/, booksBlocks)
        .replace(/\.\/books-page_files\//g, 'http://localhost:3000/books-page/books-page_files/')
        .replace(/[\n\r].*const\s+offsetLimit\s+=\s*\d+/, `const offsetLimit = ${offsetLimit}\n`)
        .replace(/[\n\r].*const\s+maxOffset\s+=\s*\d+/, `const maxOffset = ${maxOffset}\n`)
        .replace(/[\n\r].*const\s+minOffset\s+=\s*\d+/, `const minOffset = ${minOffset}\n`)
        .replace(/[\n\r].*const\s+offsetShift\s+=\s*\d+/, `const offsetShift = ${offsetShift}\n`)
        .replace(/[\n\r].*const\s+offset\s+=\s*\d+/, `const offset = ${books.length}\n`);
}
exports.makeBooksPage = makeBooksPage;
function bookPreviewHTMLBlock(book) {
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
</div>`;
}
