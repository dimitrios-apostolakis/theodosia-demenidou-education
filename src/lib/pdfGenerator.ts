import { Worksheet } from '../types/worksheet';

export function printWorksheetDirect(worksheet: Worksheet) {
  if (typeof window === 'undefined') return;

  const printWindow = window.open('', '_blank', 'width=800,height=900');
  if (!printWindow) {
    window.print();
    return;
  }

  const gradeNames: Record<string, string> = {
    A: "Α' Δημοτικού",
    B: "Β' Δημοτικού",
    C: "Γ' Δημοτικού",
    D: "Δ' Δημοτικού",
    E: "Ε' Δημοτικού",
    ST: "Στ' Δημοτικού",
  };

  const subjectNames: Record<string, string> = {
    language: 'Γλώσσα & Ορθογραφία',
    math: 'Μαθηματικά & Γεωμετρία',
    history: 'Ιστορία & Μυθολογία',
    geography: 'Γεωγραφία & Περιβάλλον',
    science: 'Φυσικά & Πειράματα',
    art: 'Εικαστικά & Τέχνες',
  };

  const html = `
    <!DOCTYPE html>
    <html lang="el">
    <head>
      <meta charset="UTF-8">
      <title>Φύλλο Εργασίας: ${worksheet.title}</title>
      <style>
        @page { size: A4; margin: 15mm; }
        body {
          font-family: 'Comic Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #1e293b;
          margin: 0;
          padding: 20px;
          background: #ffffff;
        }
        .sheet-border {
          border: 3px dashed #6366f1;
          border-radius: 16px;
          padding: 24px;
          min-height: 90vh;
          box-sizing: border-box;
          position: relative;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 12px;
          margin-bottom: 18px;
        }
        .teacher-badge {
          font-size: 14px;
          font-weight: bold;
          color: #4338ca;
        }
        .title {
          font-size: 22px;
          font-weight: 800;
          color: #1e1b4b;
          margin: 12px 0 6px 0;
          text-align: center;
        }
        .meta-strip {
          display: flex;
          justify-content: space-between;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          margin-bottom: 20px;
        }
        .instructions {
          background: #fefce8;
          border-left: 4px solid #facc15;
          padding: 12px 16px;
          border-radius: 6px;
          font-size: 14px;
          margin-bottom: 24px;
          line-height: 1.5;
        }
        .question-box {
          margin-bottom: 20px;
          padding: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #ffffff;
        }
        .q-number {
          font-weight: bold;
          color: #4f46e5;
          margin-right: 6px;
        }
        .q-text {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 8px;
        }
        .option-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          border: 1px dashed #94a3b8;
          padding: 8px 12px;
          border-radius: 6px;
        }
        .checkbox {
          width: 16px;
          height: 16px;
          border: 2px solid #64748b;
          border-radius: 4px;
          display: inline-block;
        }
        .answer-blank {
          margin-top: 10px;
          border-bottom: 1.5px dotted #94a3b8;
          height: 28px;
          width: 100%;
        }
        .footer {
          margin-top: 30px;
          border-top: 2px solid #e2e8f0;
          padding-top: 12px;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #64748b;
        }
        .star-rating {
          font-size: 16px;
        }
      </style>
    </head>
    <body>
      <div class="sheet-border">
        <div class="header">
          <div class="teacher-badge">
            🏫 Το Μαγικό Σχολείο | Θεοδοσία Δεμενίδου
          </div>
          <div>
            ${gradeNames[worksheet.grade] || worksheet.grade} • ${subjectNames[worksheet.subject] || worksheet.subject}
          </div>
        </div>

        <div class="title">${worksheet.title}</div>

        <div class="meta-strip">
          <div><strong>Όνομα Μαθητή/τριας:</strong> ____________________________________</div>
          <div><strong>Ημερομηνία:</strong> ______________</div>
          <div><strong>Βαθμός:</strong> ⭐⭐⭐⭐⭐</div>
        </div>

        <div class="instructions">
          <strong>💡 Οδηγίες:</strong> ${worksheet.content.instructions}
        </div>

        <div class="questions">
          ${worksheet.content.questions.map((q, idx) => `
            <div class="question-box">
              <div class="q-text">
                <span class="q-number">Άσκηση ${idx + 1}.</span> ${q.prompt}
              </div>
              ${q.options && q.options.length > 0 ? `
                <div class="options-grid">
                  ${q.options.map(opt => `
                    <div class="option-item">
                      <span class="checkbox"></span>
                      <span>${opt}</span>
                    </div>
                  `).join('')}
                </div>
              ` : `
                <div class="answer-blank"></div>
              `}
            </div>
          `).join('')}
        </div>

        ${worksheet.content.funFact ? `
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #1e40af; margin-top: 15px;">
            🍌 <strong>Μυστικό από τη Νανο-Μπανάνα:</strong> ${worksheet.content.funFact}
          </div>
        ` : ''}

        <div class="footer">
          <div>Επιμέλεια Υλικού: <strong>Θεοδοσία Δεμενίδου</strong> (Εκπαιδευτικός Δημοτικού)</div>
          <div>Υπογραφή Δασκάλας: ____________________</div>
        </div>
      </div>

      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
