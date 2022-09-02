import { renderWithProviders } from "utils/test-utils";
import PanelPage from "pages/panel";

it("renders unchanged", () => {
  renderWithProviders(<PanelPage />);
});
