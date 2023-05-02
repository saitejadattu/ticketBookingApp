import { screen,render } from "@testing-library/react";
import ShowDetailsForm from "./ShowDetailsForm";


describe('Show Form',()=>
{
    test('Renders Correctly',()=>
    {
        render(<ShowDetailsForm />);
        const dropdowns = screen.getByRole('option');
        expect(dropdowns).toBeInTheDocument();
    });

    test.only('Checking by Roles',()=>
    {
        const element = screen.getAllByRole('option');
        expect(element).toBeInTheDocument();
    });
})