import { fireEvent, getAllByAltText, getAllByText, getByAltText, getByPlaceholderText, getByRole, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom';
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let dom
let container

describe('index.html', () => {
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: 'dangerously' })
        container = dom.window.document.body
    });
    describe('should be 5 li', () => {
        test('ul should have 5 li children', () => {
            expect(container.querySelector('ul').children.length).toBe(5)
        });

    });
    describe('add button', () => {
        test('addButton should add a li and return 6', () => {
            const button = getByText(container, 'Añadir')
            fireEvent.click(button);
            expect(container.querySelector('ul').children.length).toBe(6);
        });
        test('button should add a li 2 times and return 7', () => {
            const button = getByText(container, 'Añadir')
            fireEvent.click(button);
            fireEvent.click(button);
            expect(container.querySelector('ul').children.length).toBe(7);
        });
        test('the new li should contain name Cordelia Ingram', () => {
            const button = getByText(container, 'Añadir')
            fireEvent.click(button);
            expect(container.querySelector('ul').lastChild.firstChild.textContent).toBe('Cordelia Ingram');
        });
    });
    describe('remove button', () => {
        test('removeButton should remove the parent li', () => {
            const button = getAllByText(container, 'Borrar')[0]
            fireEvent.click(button);
            expect(container.querySelector('ul').children.length).toBe(4);
        });
        test('if removeButton two times ul should return 3 children', () => {
            const button = getAllByText(container, 'Borrar')
            fireEvent.click(button[0]);
            fireEvent.click(button[1]);
            expect(container.querySelector('ul').children.length).toBe(3);
        });
        test('if add two user and delete one, ul should return 6 children', () => {
            const addButton = getByText(container, 'Añadir')
            fireEvent.click(addButton);
            fireEvent.click(addButton);
            const button = getAllByText(container, 'Borrar')
            fireEvent.click(button[0]);
            expect(container.querySelector('ul').children.length).toBe(6);
        });
    });
    // describe('input filter', () => {
    //     test('input filter should return 3 children', () => {
    //         const input = getByPlaceholderText(container, 'Nombre')
    //         fireEvent.change(input, { target: { value: 'Cordelia' } })
    //         expect(container.querySelector('ul').children.length).toBe(0);
    //     })
    // });
})
