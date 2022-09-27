import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, prettyDOM, render } from "@testing-library/react";
import Modal from "../components/Modal.jsx";

describe("<Modal />",()=>{
    let component;
    const mockHandler = jest.fn();

    beforeEach(()=>{
        component = render(
            <Modal onClose={mockHandler}>
                <div>testDivContent</div>
            </Modal>
        )
    })

    test("render its children", ()=>{
        const el = component.getByText("testDivContent");
        expect(el.parentNode).toHaveStyle('display: block');
        expect(el.parentNode).toHaveClass("modal");
    });


});

// npm test -- --coverage  // vemos cuanto cubrimos con los test