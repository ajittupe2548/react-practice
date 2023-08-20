import { render } from "@testing-library/react";
import Header from "../Header";

test("Logo should load on rendering header", () => {
    const header = render(<Header />);

    const logo = header.getByTestId("logo");

    expect(logo.src).toBe(
        "https://imgd.aeplcdn.com/0x0/cw/static/icons/new-header/logo.svg"
    );
});
