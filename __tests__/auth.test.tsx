import { render } from "@testing-library/react";
import { withRouter } from "next/router";
import AuthPage from "pages/auth/[slug]";

it("renders unchanged", () => {
  const wrapper = withRouter(() => <AuthPage />);
  const { container } = render(<>{wrapper}</>);
  expect(container).toMatchSnapshot();
});
