import React, { Children } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { MemoryRouter, Route } from 'react-router-dom';

import { Board, Game} from './index.js';

describe('tic-tac-toe', function() {
    // this line is only valid in type script
    // let container: HTMLDivElement | null = null;
    var container = /** @type {HTMLDivElement} */ (document.createElement(null));
});