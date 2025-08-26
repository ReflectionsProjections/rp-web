export function rpMainTemplate(htmlContent: string) {
  return `
    <mjml>
        <mj-body background-color="#f8f8f8">
            <mj-section background-color="#ffffff" padding="20px">
            <mj-column>
                <mj-text font-size="20px" font-family="Arial" color="#004080" align="center">
                Our Organization Newsletter
                </mj-text>
                <mj-divider border-color="#004080" />
                <mj-text font-family="Arial" font-size="14px" color="#333333">
                ${htmlContent}
                </mj-text>
            </mj-column>
            </mj-section>
            <mj-section background-color="#eeeeee">
            <mj-column>
                <mj-text font-size="12px" color="#666" align="center">
                © 2025 Our Organization
                </mj-text>
            </mj-column>
            </mj-section>
        </mj-body>
    </mjml>
    `;
}
