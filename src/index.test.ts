import { fireEvent, getByText } from '@testing-library/dom'
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
    })

    test('ul should have 5 li children', () => {
        expect(container.querySelector('ul').children.length).toBe(5)
    });
    test('button should add a li and return 6', () => {
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
        expect(container.querySelector('ul :nth-child(6)').textContent).toBe('Cordelia Ingram');
    });
})
