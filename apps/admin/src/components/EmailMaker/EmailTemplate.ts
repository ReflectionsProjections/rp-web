export function rpMainTemplate(htmlContent: string) {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        /* Reset and compatibility */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100% !important;
            -ms-text-size-adjust: 100% !important;
        }
        
        table, td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }
        
        /* Force colors in dark mode */
        [data-ogsc] *,
        [data-ogsb] *,
        .darkmode *,
        [data-darkreader] *,
        u + .body * {
            background-color: transparent !important;
        }
        
        [data-ogsc] .email-container,
        [data-ogsb] .email-container,
        .darkmode .email-container {
            background-color: #ffffff !important;
        }
        
        [data-ogsc] .main-bg,
        [data-ogsb] .main-bg,
        .darkmode .main-bg {
            background-color: #f8f9fa !important;
        }
        
        [data-ogsc] .header-bg,
        [data-ogsb] .header-bg,
        .darkmode .header-bg {
            background-color: #c0392b !important;
        }
        
        [data-ogsc] .info-bg,
        [data-ogsb] .info-bg,
        .darkmode .info-bg {
            background-color: #f8f9fa !important;
        }
        
        /* Outlook link fixes */
        [data-ogsc] a,
        [data-ogsb] a,
        .darkmode a {
            color: #c0392b !important;
            text-decoration: underline !important;
        }
        
        /* Main styles */
        body {
            margin: 0 !important;
            padding: 0 !important;
            font-family: Arial, Helvetica, sans-serif !important;
            background-color: #f8f9fa !important;
            color: #2c3e50 !important;
            line-height: 1.6 !important;
        }
        
        .main-bg {
            background-color: #f8f9fa !important;
            padding: 20px 0 !important;
            width: 100% !important;
        }
        
        .email-container {
            max-width: 600px !important;
            margin: 0 auto !important;
            background-color: #ffffff !important;
            border: 1px solid #e1e8ed !important;
            border-radius: 8px !important;
            overflow: hidden !important;
        }
        
        .header-table {
            width: 100% !important;
            border-collapse: collapse !important;
        }
        
        .header-bg {
            background-color: #c0392b !important;
            padding: 30px 20px !important;
            text-align: center !important;
        }
        
        .header-title {
            margin: 0 !important;
            font-size: 24px !important;
            font-weight: bold !important;
            letter-spacing: 1px !important;
            text-transform: uppercase !important;
            color: #ffffff !important;
            font-family: Arial, Helvetica, sans-serif !important;
        }
        
        .content-table {
            width: 100% !important;
            border-collapse: collapse !important;
        }
        
        .content-area {
            padding: 40px 30px !important;
            background-color: #ffffff !important;
        }
        
        .welcome-text {
            font-size: 16px !important;
            margin: 0 0 25px 0 !important;
            color: #2c3e50 !important;
            line-height: 1.6 !important;
            font-family: Arial, Helvetica, sans-serif !important;
        }
        
        .update-table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin: 25px 0 !important;
        }
        
        .update-box {
            background-color: #f8f9fa !important;
            border: 2px solid #c0392b !important;
            border-radius: 8px !important;
            padding: 20px !important;
            text-align: center !important;
            font-family: Arial, Helvetica, sans-serif !important;
            font-size: 16px !important;
            color: #2c3e50 !important;
        }
        
        /* Outlook-specific link styling */
        .update-link {
            color: #c0392b !important;
            text-decoration: underline !important;
            font-weight: bold !important;
            font-size: 16px !important;
            font-family: Arial, Helvetica, sans-serif !important;
        }
        
        /* Additional Outlook link fixes */
        span.MsoHyperlink {
            color: #c0392b !important;
            text-decoration: underline !important;
        }
        
        span.MsoHyperlinkFollowed {
            color: #a93226 !important;
            text-decoration: underline !important;
        }
        
        .section-title {
            font-size: 18px !important;
            font-weight: bold !important;
            margin: 30px 0 20px 0 !important;
            color: #c0392b !important;
            border-bottom: 2px solid #c0392b !important;
            padding-bottom: 5px !important;
            font-family: Arial, Helvetica, sans-serif !important;
        }
        
        .info-table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin: 20px 0 !important;
        }
        
        .info-bg {
            background-color: #f8f9fa !important;
            border-radius: 8px !important;
        }
        
        .info-row {
            border-bottom: 1px solid #ecf0f1 !important;
        }
        
        .info-row:last-child {
            border-bottom: none !important;
        }
        
        .info-label {
            font-weight: bold !important;
            color: #7f8c8d !important;
            width: 140px !important;
            padding: 12px 15px !important;
            vertical-align: top !important;
            font-family: Arial, Helvetica, sans-serif !important;
            font-size: 14px !important;
        }
        
        .info-value {
            color: #2c3e50 !important;
            padding: 12px 15px !important;
            font-family: Arial, Helvetica, sans-serif !important;
            font-size: 14px !important;
        }
        
        .nested-link {
            color: #c0392b !important;
            text-decoration: underline !important;
            font-family: Arial, Helvetica, sans-serif !important;
        }
        
        .resume-table {
            margin-top: 10px !important;
        }
        
        .resume-button {
            background-color: #c0392b !important;
            color: #ffffff !important;
            padding: 10px 20px !important;
            text-decoration: none !important;
            border-radius: 6px !important;
            display: inline-block !important;
            font-weight: bold !important;
            font-size: 14px !important;
            font-family: Arial, Helvetica, sans-serif !important;
            border: none !important;
        }
        
        .footer-table {
            width: 100% !important;
            border-collapse: collapse !important;
        }
        
        .footer-area {
            background-color: #ecf0f1 !important;
            padding: 20px !important;
            text-align: center !important;
            border-top: 1px solid #bdc3c7 !important;
            font-size: 14px !important;
            color: #7f8c8d !important;
            font-family: Arial, Helvetica, sans-serif !important;
        }
        
        /* Mobile responsive */
        @media only screen and (max-width: 600px) {
            .content-area {
                padding: 20px 15px !important;
            }
            
            .info-label,
            .info-value {
                display: block !important;
                width: 100% !important;
                padding: 8px 15px !important;
            }
            
            .info-label {
                padding-bottom: 4px !important;
            }
        }
    </style>
</head>
<body>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" class="main-bg">
        <tr>
            <td align="center">
                <table class="email-container" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td>
                            <table class="header-table" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td class="header-bg">
                                        <h1 class="header-title">R|P 2025</h1>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <tr>
                        <td>
                            <table class="content-table" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td class="content-area">
                                        <p class="welcome-text">
                                            This is an automated test message from R|P :) I don't know how to default max width
                                        </p>
                                        
                                        <h2 class="section-title">Message Content</h2>
                                        ${htmlContent}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <tr>
                        <td>
                            <table class="footer-table" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td class="footer-area">
                                        R|P 2025 • Reflections | Projections
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}
