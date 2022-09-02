import { renderWithProviders } from "utils/test-utils";
import AuthPage from "pages/auth/[slug]";

it("renders unchanged", () => {
  renderWithProviders(<AuthPage />);
});
