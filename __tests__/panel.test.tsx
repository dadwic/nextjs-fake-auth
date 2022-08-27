import { render } from "@testing-library/react";
import { withRouter } from "next/router";
import PanelPage from "pages/panel";

it("renders unchanged", () => {
  const wrapper = withRouter(() => <PanelPage />);
  const { container } = render(<>{wrapper}</>);
  expect(container).toMatchSnapshot();
});
