import { act, fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Audit from "./Audit";

const { submit, toast, dismiss } = vi.hoisted(() => ({
    submit: vi.fn(),
    toast: vi.fn(),
    dismiss: vi.fn(),
}));

vi.mock("@/lib/api", () => ({ api: { contact: { submit } } }));
vi.mock("@/hooks/use-toast", () => ({ useToast: () => ({ toast, dismiss }) }));
vi.mock("@/components/layout/PageLayout", () => ({
    PageLayout: ({ children }: { children: ReactNode }) => <main>{children}</main>,
}));
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string, options?: { returnObjects?: boolean }) => (options?.returnObjects ? [] : key),
    }),
}));

function fillAndSubmit(url: string, email = "test@example.com") {
    fireEvent.change(screen.getByLabelText("auditTool.form.urlLabel"), { target: { value: url } });
    fireEvent.change(screen.getByLabelText("auditTool.form.emailLabel"), { target: { value: email } });
    const form = screen.getByLabelText("auditTool.form.urlLabel").closest("form") as HTMLFormElement;
    fireEvent.submit(form);
    return form;
}

describe("Audit form", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
        render(
            <MemoryRouter>
                <Audit />
            </MemoryRouter>,
        );
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("sends a bare domain as a full URL", async () => {
        submit.mockResolvedValue({ success: true });
        fillAndSubmit(" acme.com ");
        await act(async () => {});
        expect(submit).toHaveBeenCalledWith(expect.objectContaining({ website: "https://acme.com/", source: "audit" }));
    });

    it("rejects an unusable website without sending", async () => {
        fillAndSubmit("not a website");
        await act(async () => {});
        expect(submit).not.toHaveBeenCalled();
        expect(toast).toHaveBeenCalledWith(expect.objectContaining({ description: "auditTool.toast.invalidUrl" }));
    });

    it("rejects an invalid email without sending", async () => {
        fillAndSubmit("acme.com", "nope");
        await act(async () => {});
        expect(submit).not.toHaveBeenCalled();
        expect(toast).toHaveBeenCalledWith(expect.objectContaining({ description: "auditTool.toast.invalidEmail" }));
    });

    it("shows a sending state and ignores repeat submits", async () => {
        submit.mockReturnValue(new Promise(() => {}));
        const form = fillAndSubmit("acme.com");
        fireEvent.submit(form);
        fireEvent.submit(form);
        await act(async () => {});

        expect(submit).toHaveBeenCalledTimes(1);
        const button = screen.getByRole("button", { name: "auditTool.form.submitting" });
        expect(button).toHaveProperty("disabled", true);
        expect(button.getAttribute("aria-busy")).toBe("true");
        expect(screen.getByLabelText("auditTool.form.urlLabel")).toHaveProperty("readOnly", true);
        expect(screen.getByLabelText("auditTool.form.emailLabel")).toHaveProperty("readOnly", true);
        expect(screen.getByLabelText("auditTool.form.phoneLabel")).toHaveProperty("readOnly", true);
    });

    it("clears an old error when a valid request starts", async () => {
        submit.mockResolvedValue({ success: true });
        fillAndSubmit("acme.com");
        await act(async () => {});
        expect(dismiss).toHaveBeenCalled();
    });

    it("keeps the details and allows a retry when sending fails", async () => {
        submit.mockResolvedValueOnce({ success: false, message: "Nope" });
        fillAndSubmit("acme.com");
        await act(async () => {});

        expect(toast).toHaveBeenCalledWith(expect.objectContaining({ title: "auditTool.toast.errorTitle" }));
        expect((screen.getByLabelText("auditTool.form.urlLabel") as HTMLInputElement).value).toBe("acme.com");
        expect(screen.getByRole("button", { name: "auditTool.form.submitCta" })).toHaveProperty("disabled", false);
    });

    it("gives up after the timeout when a request never finishes", async () => {
        submit.mockReturnValue(new Promise(() => {}));
        fillAndSubmit("acme.com");
        await act(async () => {
            await vi.advanceTimersByTimeAsync(15000);
        });

        expect(toast).toHaveBeenCalledWith(expect.objectContaining({ title: "auditTool.toast.timeoutTitle" }));
        expect((screen.getByLabelText("auditTool.form.urlLabel") as HTMLInputElement).value).toBe("acme.com");
        expect((screen.getByLabelText("auditTool.form.emailLabel") as HTMLInputElement).value).toBe("test@example.com");
        expect(screen.getByRole("button", { name: "auditTool.form.submitCta" })).toHaveProperty("disabled", false);
    });
});
