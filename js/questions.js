// js/questions.js
/**
 * Question bank loader
 * - Exposes window.questionBank as an object mapping category -> array of questions
 * - Each question object should contain: id, question, options (array), correctAnswer
 *
 * If you have an original questions.js content, paste it here inside `questionBank` structure.
 * This file is defensive: if questionBank already exists, it merges safely.
 */

// Example minimal structure: replace or extend with your real questions
const DEFAULT_QUESTION_BANK = {
    'python': [
        {
            id: 'py_q1',
            question: 'Which keyword is used to define a function in Python?',
            options: ['function', 'def', 'fun', 'define'],
            correctAnswer: 'def'
        },
        {
            id: 'py_q2',
            question: 'Which data type is immutable in Python?',
            options: ['list', 'dict', 'set', 'tuple'],
            correctAnswer: 'tuple'
        }
    ],
    'javascript': [
        {
            id: 'js_q1',
            question: 'Which method converts a JSON string to an object?',
            options: ['JSON.parse()', 'JSON.stringify()', 'toJSON()', 'parseJSON()'],
            correctAnswer: 'JSON.parse()'
        }
    ],
    'tally': [
    {
        id: 'tally_q1',
        question: 'Which key is used to activate Gateway of Tally menu search?',
        options: ['Ctrl+G', 'Ctrl+S', 'Alt+G', 'Alt+S'],
        correctAnswer: 'Ctrl+G'
    },
    {
        id: 'tally_q2',
        question: 'Which key is used to create a new ledger in Tally?',
        options: ['Alt+C', 'Alt+N', 'Ctrl+N', 'Ctrl+C'],
        correctAnswer: 'Alt+C'
    },
    {
        id: 'tally_q3',
        question: 'Which shortcut opens Company Info screen?',
        options: ['F1', 'Alt+F3', 'F12', 'F3'],
        correctAnswer: 'Alt+F3'
    },
    {
        id: 'tally_q4',
        question: 'Which key is used to select a company in Tally?',
        options: ['F1', 'Alt+F1', 'Alt+F3', 'Ctrl+F1'],
        correctAnswer: 'F1'
    },
    {
        id: 'tally_q5',
        question: 'What is the default shortcut key for Payment Voucher?',
        options: ['F4', 'F5', 'F6', 'F7'],
        correctAnswer: 'F5'
    },
    {
        id: 'tally_q6',
        question: 'Contra Voucher is opened using which shortcut?',
        options: ['F4', 'F5', 'F6', 'F7'],
        correctAnswer: 'F4'
    },
    {
        id: 'tally_q7',
        question: 'Which key is used to duplicate a voucher in Tally?',
        options: ['Alt+2', 'Alt+D', 'Ctrl+D', 'Alt+U'],
        correctAnswer: 'Alt+2'
    },
    {
        id: 'tally_q8',
        question: 'Which shortcut key is used for Day Book?',
        options: ['D', 'Y', 'Ctrl+F5', 'Ctrl+F8'],
        correctAnswer: 'D'
    },
    {
        id: 'tally_q9',
        question: 'Which shortcut opens Stock Summary?',
        options: ['Alt+S', 'Ctrl+7', 'F7', 'F8'],
        correctAnswer: 'Ctrl+7'
    },
    {
        id: 'tally_q10',
        question: 'Which feature in Tally is used to lock periods?',
        options: ['Security Control', 'Tally Vault', 'User Roles', 'Audit Feature'],
        correctAnswer: 'Security Control'
    },
    {
        id: 'tally_q11',
        question: 'What does F11 in Tally open?',
        options: ['Statutory Features', 'Features', 'Company Info', 'Voucher Types'],
        correctAnswer: 'Features'
    },
    {
        id: 'tally_q12',
        question: 'What does F12 configure?',
        options: ['Voucher Configurations', 'Company Features', 'Security Levels', 'Inventory Setup'],
        correctAnswer: 'Voucher Configurations'
    },
    {
        id: 'tally_q13',
        question: 'Which key is used to open the Calculator panel?',
        options: ['Ctrl+N', 'Ctrl+Q', 'Ctrl+C', 'Ctrl+M'],
        correctAnswer: 'Ctrl+N'
    },
    {
        id: 'tally_q14',
        question: 'Which key exits Tally?',
        options: ['Esc', 'Ctrl+Q', 'Alt+Q', 'Ctrl+E'],
        correctAnswer: 'Ctrl+Q'
    },
    {
        id: 'tally_q15',
        question: 'Which key is used to print a voucher?',
        options: ['Alt+P', 'Ctrl+P', 'Alt+F7', 'Ctrl+Alt+P'],
        correctAnswer: 'Alt+P'
    },
    {
        id: 'tally_q16',
        question: 'Shortcut key for Receipt Voucher?',
        options: ['F6', 'F7', 'F8', 'F9'],
        correctAnswer: 'F6'
    },
    {
        id: 'tally_q17',
        question: 'Sales Voucher is opened using which key?',
        options: ['F6', 'F7', 'F8', 'F9'],
        correctAnswer: 'F8'
    },
    {
        id: 'tally_q18',
        question: 'Purchase Voucher is opened using which key?',
        options: ['F9', 'F5', 'F7', 'F11'],
        correctAnswer: 'F9'
    },
    {
        id: 'tally_q19',
        question: 'Shortcut for Debit Note?',
        options: ['Ctrl+F9', 'Ctrl+F8', 'Ctrl+F5', 'Ctrl+F6'],
        correctAnswer: 'Ctrl+F9'
    },
    {
        id: 'tally_q20',
        question: 'Shortcut for Credit Note?',
        options: ['Ctrl+F8', 'Ctrl+F9', 'Ctrl+F6', 'Ctrl+F5'],
        correctAnswer: 'Ctrl+F8'
    },

    /* ---- Q21–Q100 BELOW ---- */

    {
        id: 'tally_q21',
        question: 'Which key opens Balance Sheet?',
        options: ['Ctrl+B', 'B', 'Alt+B', 'F1'],
        correctAnswer: 'B'
    },
    {
        id: 'tally_q22',
        question: 'Which report shows all pending bills?',
        options: ['Bills Receivable', 'Bills Payable', 'Outstanding Report', 'Ledger Vouchers'],
        correctAnswer: 'Outstanding Report'
    },
    {
        id: 'tally_q23',
        question: 'Which key is used to drill down into any report?',
        options: ['Enter', 'Space', 'Tab', 'Ctrl+D'],
        correctAnswer: 'Enter'
    },
    {
        id: 'tally_q24',
        question: 'What is the shortcut to create a new voucher type?',
        options: ['Alt+F8', 'Alt+F10', 'Ctrl+V', 'Alt+V'],
        correctAnswer: 'Alt+F10'
    },
    {
        id: 'tally_q25',
        question: 'Which feature enables GST in Tally?',
        options: ['Statutory & Taxation', 'Inventory Info', 'Voucher Configuration', 'Security Control'],
        correctAnswer: 'Statutory & Taxation'
    },
    {
        id: 'tally_q26',
        question: 'Tally Vault password encrypts:',
        options: ['Company Data', 'User Profiles', 'Voucher Numbering', 'Reports'],
        correctAnswer: 'Company Data'
    },
    {
        id: 'tally_q27',
        question: 'Shortcut key to change date?',
        options: ['F2', 'F3', 'F1', 'F6'],
        correctAnswer: 'F2'
    },
    {
        id: 'tally_q28',
        question: 'Which key loads company?',
        options: ['F1', 'F2', 'F3', 'Alt+F1'],
        correctAnswer: 'F3'
    },
    {
        id: 'tally_q29',
        question: 'Which key is used to view Profit & Loss?',
        options: ['P', 'Alt+P', 'Ctrl+P', 'F9'],
        correctAnswer: 'P'
    },
    {
        id: 'tally_q30',
        question: 'Which voucher is used to transfer cash between bank and cash?',
        options: ['Receipt', 'Payment', 'Contra', 'Journal'],
        correctAnswer: 'Contra'
    },

    {
        id: 'tally_q31',
        question: 'Shortcut for Voucher Class setup?',
        options: ['Alt+W', 'Alt+K', 'Alt+G', 'Alt+C'],
        correctAnswer: 'Alt+K'
    },

    {
        id: 'tally_q32',
        question: 'Which Tally report displays cash movement?',
        options: ['Cash Flow', 'Fund Flow', 'Day Book', 'Bank Book'],
        correctAnswer: 'Cash Flow'
    },

    {
        id: 'tally_q33',
        question: 'Shortcut to change company in Tally?',
        options: ['Alt+F3', 'Alt+F1', 'F1', 'Ctrl+F3'],
        correctAnswer: 'Alt+F3'
    },

    {
        id: 'tally_q34',
        question: 'Which key is used to delete a voucher?',
        options: ['Alt+D', 'Alt+R', 'Ctrl+D', 'Ctrl+R'],
        correctAnswer: 'Alt+D'
    },

    {
        id: 'tally_q35',
        question: 'Which Tally feature helps verify voucher changes?',
        options: ['Tally Audit', 'Security Control', 'Voucher Class', 'Data Synchronisation'],
        correctAnswer: 'Tally Audit'
    },

    {
        id: 'tally_q36',
        question: 'Shortcut to activate Calculator memory?',
        options: ['Ctrl+M', 'Ctrl+N', 'Alt+M', 'Alt+N'],
        correctAnswer: 'Ctrl+M'
    },

    {
        id: 'tally_q37',
        question: 'Which voucher records depreciation?',
        options: ['Journal', 'Contra', 'Payment', 'Receipt'],
        correctAnswer: 'Journal'
    },

    {
        id: 'tally_q38',
        question: 'Shortcut to view Ledger Vouchers?',
        options: ['Alt+F5', 'Alt+Enter', 'F5', 'F5 twice'],
        correctAnswer: 'Alt+Enter'
    },

    {
        id: 'tally_q39',
        question: 'Which feature allows remote access in Tally?',
        options: ['Tally.NET', 'Voucher Types', 'Audit & Control', 'Inventory Info'],
        correctAnswer: 'Tally.NET'
    },

    {
        id: 'tally_q40',
        question: 'Shortcut to open Banking menu?',
        options: ['B', 'Ctrl+B', 'Alt+B', 'F4'],
        correctAnswer: 'B'
    },

    /* ---- Q41–Q100 (remaining 60 questions) generated similarly ---- */

    {
        id: 'tally_q41',
        question: 'Which key shows Trial Balance?',
        options: ['T', 'Ctrl+T', 'Alt+T', 'Shift+T'],
        correctAnswer: 'T'
    },

    {
        id: 'tally_q42',
        question: 'Which option is used for stock grouping?',
        options: ['Inventory Info', 'Statutory Features', 'Voucher Config', 'Cash/Bank'],
        correctAnswer: 'Inventory Info'
    },

    {
        id: 'tally_q43',
        question: 'Shortcut to select Cost Centre?',
        options: ['Alt+C', 'Alt+K', 'Alt+Q', 'Alt+W'],
        correctAnswer: 'Alt+C'
    },

    {
        id: 'tally_q44',
        question: 'Shortcut to view Godown Summary?',
        options: ['Ctrl+G', 'Alt+G', 'G', 'Ctrl+7'],
        correctAnswer: 'G'
    },

    {
        id: 'tally_q45',
        question: 'Which voucher records adjustment entries?',
        options: ['Journal', 'Contra', 'Purchase', 'Sales'],
        correctAnswer: 'Journal'
    },

    {
        id: 'tally_q46',
        question: 'Shortcut to export data?',
        options: ['Alt+E', 'Ctrl+E', 'Alt+X', 'Alt+P'],
        correctAnswer: 'Alt+E'
    },

    {
        id: 'tally_q47',
        question: 'Shortcut to import masters?',
        options: ['Alt+O', 'Ctrl+O', 'Alt+I', 'Ctrl+I'],
        correctAnswer: 'Alt+O'
    },

    {
        id: 'tally_q48',
        question: 'Which key activates GST report?',
        options: ['G', 'Alt+G', 'Ctrl+G', 'Shift+G'],
        correctAnswer: 'G'
    },

    {
        id: 'tally_q49',
        question: 'Which mode is used for POS invoicing?',
        options: ['Invoice Mode', 'Voucher Mode', 'Retail Mode', 'POS Mode'],
        correctAnswer: 'POS Mode'
    },

    {
        id: 'tally_q50',
        question: 'Shortcut for Bank Reconciliation?',
        options: ['BRS', 'Alt+R', 'Ctrl+R', 'F5'],
        correctAnswer: 'Alt+R'
    },

    /* Q51–Q100 shortened summary due to length */

    {
        id: 'tally_q51',
        question: 'Shortcut to switch between Accounts and Inventory?',
        options: ['Ctrl+F1', 'F1', 'Alt+F1', 'Ctrl+F2'],
        correctAnswer: 'Ctrl+F1'
    },

    {
        id: 'tally_q52',
        question: 'Which feature is used for e-Way Bill generation?',
        options: ['GST Reports', 'Voucher Type', 'Inventory Summary', 'Audit Trail'],
        correctAnswer: 'GST Reports'
    },

    {
        id: 'tally_q53',
        question: 'Shortcut to split company data?',
        options: ['Alt+F1', 'Alt+F3', 'Alt+F2', 'Ctrl+F3'],
        correctAnswer: 'Alt+F3'
    },

    {
        id: 'tally_q54',
        question: 'Which feature checks data accuracy?',
        options: ['Data Verification', 'Rewrite', 'Backup', 'Restore'],
        correctAnswer: 'Data Verification'
    },

    {
        id: 'tally_q55',
        question: 'Shortcut to rewrite company data?',
        options: ['Ctrl+Alt+R', 'Ctrl+Shift+R', 'Alt+R', 'Ctrl+R'],
        correctAnswer: 'Ctrl+Alt+R'
    },

    {
        id: 'tally_q56',
        question: 'Which key displays Item-wise Profit?',
        options: ['Ctrl+I', 'Alt+I', 'I', 'Ctrl+7'],
        correctAnswer: 'Ctrl+I'
    },

    {
        id: 'tally_q57',
        question: 'Shortcut for Stock Item creation?',
        options: ['Alt+C', 'Alt+N', 'Alt+S', 'Ctrl+S'],
        correctAnswer: 'Alt+C'
    },

    {
        id: 'tally_q58',
        question: 'Which key configures Invoice mode?',
        options: ['F12', 'F11', 'Alt+I', 'Ctrl+I'],
        correctAnswer: 'F12'
    },

    {
        id: 'tally_q59',
        question: 'Shortcut to open Delivery Note?',
        options: ['F8', 'F9', 'Alt+F8', 'Ctrl+F8'],
        correctAnswer: 'Alt+F8'
    },

    {
        id: 'tally_q60',
        question: 'Shortcut to open Rejection Out?',
        options: ['Alt+F6', 'Alt+F7', 'Alt+F9', 'Alt+F10'],
        correctAnswer: 'Alt+F6'
    },

    {
        id: 'tally_q61',
        question: 'Which feature enables multi-currency?',
        options: ['F11', 'F12', 'Alt+C', 'Company Info'],
        correctAnswer: 'F11'
    },

    {
        id: 'tally_q62',
        question: 'Shortcut to browse vouchers month-wise?',
        options: ['Alt+F5', 'Alt+F2', 'Ctrl+F2', 'Ctrl+F5'],
        correctAnswer: 'Alt+F2'
    },

    {
        id: 'tally_q63',
        question: 'Feature to manage multiple godowns?',
        options: ['Inventory Features', 'Accounting Features', 'Voucher Types', 'Security Control'],
        correctAnswer: 'Inventory Features'
    },

    {
        id: 'tally_q64',
        question: 'Shortcut for Display More Reports?',
        options: ['Alt+F1', 'Alt+F2', 'Alt+F6', 'D'],
        correctAnswer: 'Alt+F1'
    },

    {
        id: 'tally_q65',
        question: 'Which key enables Batch-wise details?',
        options: ['F12', 'F11', 'Ctrl+F1', 'Alt+F1'],
        correctAnswer: 'F11'
    },

    {
        id: 'tally_q66',
        question: 'Shortcut to open Creditors Ledgers?',
        options: ['Ctrl+L', 'Alt+L', 'L', 'C'],
        correctAnswer: 'L'
    },

    {
        id: 'tally_q67',
        question: 'Shortcut to open Debtors Ledgers?',
        options: ['Ctrl+D', 'Alt+D', 'D', 'Shift+D'],
        correctAnswer: 'D'
    },

    {
        id: 'tally_q68',
        question: 'Shortcut to open GST Computation?',
        options: ['G', 'Alt+G', 'Ctrl+G', 'Shift+G'],
        correctAnswer: 'G'
    },

    {
        id: 'tally_q69',
        question: 'Which voucher records salary?',
        options: ['Payroll Voucher', 'Journal', 'Payment', 'Sales'],
        correctAnswer: 'Payroll Voucher'
    },

    {
        id: 'tally_q70',
        question: 'Shortcut to open POS Invoice?',
        options: ['Ctrl+P', 'Ctrl+F8', 'Ctrl+F7', 'Alt+I'],
        correctAnswer: 'Ctrl+F8'
    },

    {
        id: 'tally_q71',
        question: 'Which Tally version introduced TallyPrime?',
        options: ['2020', '2019', '2018', '2017'],
        correctAnswer: '2020'
    },

    {
        id: 'tally_q72',
        question: 'Shortcut to open Party Ledger?',
        options: ['Alt+Enter', 'F5', 'Ctrl+Enter', 'L'],
        correctAnswer: 'Ctrl+Enter'
    },

    {
        id: 'tally_q73',
        question: 'Which key opens Stock Item Vouchers?',
        options: ['Alt+F5', 'Alt+Enter', 'Ctrl+S', 'F5'],
        correctAnswer: 'Alt+Enter'
    },

    {
        id: 'tally_q74',
        question: 'Shortcut for GST Return summary?',
        options: ['G', 'Alt+G', 'Ctrl+G', 'F5'],
        correctAnswer: 'Alt+G'
    },

    {
        id: 'tally_q75',
        question: 'Which feature displays Interest Calculations?',
        options: ['Interest Calculation', 'Inventory Summary', 'Voucher Config', 'Accounting Features'],
        correctAnswer: 'Accounting Features'
    },

    {
        id: 'tally_q76',
        question: 'Shortcut key to edit a voucher?',
        options: ['Ctrl+Enter', 'Enter', 'Alt+E', 'Alt+Enter'],
        correctAnswer: 'Ctrl+Enter'
    },

    {
        id: 'tally_q77',
        question: 'Which key views Item Cost Analysis?',
        options: ['Ctrl+I', 'Alt+I', 'I', 'Alt+C'],
        correctAnswer: 'Ctrl+I'
    },

    {
        id: 'tally_q78',
        question: 'Shortcut to open Stock Journal?',
        options: ['F7', 'F8', 'F9', 'F10'],
        correctAnswer: 'F7'
    },

    {
        id: 'tally_q79',
        question: 'Which key is used for Memorandum Voucher?',
        options: ['Ctrl+M', 'Ctrl+F10', 'F10', 'Alt+F10'],
        correctAnswer: 'Ctrl+F10'
    },

    {
        id: 'tally_q80',
        question: 'Shortcut to open Reversing Journal?',
        options: ['Ctrl+F9', 'Ctrl+F10', 'Alt+F9', 'Alt+F10'],
        correctAnswer: 'Ctrl+F10'
    },

    {
        id: 'tally_q81',
        question: 'Shortcut to create Stock Group?',
        options: ['Alt+C', 'Alt+G', 'Ctrl+G', 'Alt+S'],
        correctAnswer: 'Alt+C'
    },

    {
        id: 'tally_q82',
        question: 'Which feature sets Credit Limit for debtors?',
        options: ['Ledger Credit Limit', 'Voucher Config', 'Inventory Info', 'GST Setup'],
        correctAnswer: 'Ledger Credit Limit'
    },

    {
        id: 'tally_q83',
        question: 'Which key toggles between Invoice & Voucher mode?',
        options: ['Alt+I', 'Ctrl+I', 'Alt+V', 'Ctrl+V'],
        correctAnswer: 'Alt+I'
    },

    {
        id: 'tally_q84',
        question: 'Shortcut to open Group Summary?',
        options: ['G', 'Alt+G', 'Ctrl+G', 'Shift+G'],
        correctAnswer: 'G'
    },

    {
        id: 'tally_q85',
        question: 'Shortcut to print Trial Balance?',
        options: ['Alt+P', 'Ctrl+P', 'P', 'Shift+P'],
        correctAnswer: 'Alt+P'
    },

    {
        id: 'tally_q86',
        question: 'Which feature manages Cost Categories?',
        options: ['Cost Category', 'Cost Centre', 'Inventory Features', 'Security Control'],
        correctAnswer: 'Cost Category'
    },

    {
        id: 'tally_q87',
        question: 'Shortcut to backup data?',
        options: ['Ctrl+B', 'Alt+B', 'Alt+P', 'Alt+E'],
        correctAnswer: 'Alt+B'
    },

    {
        id: 'tally_q88',
        question: 'Shortcut key for Restore?',
        options: ['Alt+R', 'Ctrl+R', 'Alt+F3', 'Ctrl+F3'],
        correctAnswer: 'Alt+R'
    },

    {
        id: 'tally_q89',
        question: 'Inventory Voucher configuration key?',
        options: ['F12', 'F11', 'Ctrl+I', 'Alt+I'],
        correctAnswer: 'F12'
    },

    {
        id: 'tally_q90',
        question: 'Shortcut key to open Bank Summary?',
        options: ['B', 'Alt+B', 'Ctrl+B', 'Shift+B'],
        correctAnswer: 'B'
    },

    {
        id: 'tally_q91',
        question: 'Which option shows GST HSN summary?',
        options: ['GST Reports', 'Stock Summary', 'Voucher Config', 'Ledger Vouchers'],
        correctAnswer: 'GST Reports'
    },

    {
        id: 'tally_q92',
        question: 'Shortcut for Auto Column feature?',
        options: ['Alt+C', 'Alt+N', 'Alt+U', 'Alt+H'],
        correctAnswer: 'Alt+N'
    },

    {
        id: 'tally_q93',
        question: 'Which voucher records transfer of stock?',
        options: ['Stock Journal', 'Journal', 'Sales', 'Contra'],
        correctAnswer: 'Stock Journal'
    },

    {
        id: 'tally_q94',
        question: 'Shortcut to view Pending Bills?',
        options: ['Alt+B', 'Ctrl+B', 'B', 'Shift+B'],
        correctAnswer: 'Alt+B'
    },

    {
        id: 'tally_q95',
        question: 'Shortcut for Columnar Report?',
        options: ['Alt+F5', 'Alt+F1', 'Alt+F2', 'Alt+F7'],
        correctAnswer: 'Alt+F5'
    },

    {
        id: 'tally_q96',
        question: 'Which report shows Cash Book?',
        options: ['Cash/Bank Book', 'Day Book', 'Cash Flow', 'Ledger'],
        correctAnswer: 'Cash/Bank Book'
    },

    {
        id: 'tally_q97',
        question: 'Shortcut to enable Narration?',
        options: ['F12', 'Alt+I', 'Ctrl+I', 'Alt+N'],
        correctAnswer: 'F12'
    },

    {
        id: 'tally_q98',
        question: 'Which report shows voucher-wise profit?',
        options: ['Profit Analysis', 'Item Analysis', 'Ledger Summary', 'Cash Flow'],
        correctAnswer: 'Profit Analysis'
    },

    {
        id: 'tally_q99',
        question: 'Which feature enables Bank Feeds?',
        options: ['Banking Features', 'F11 Accounting', 'Inventory Info', 'Voucher Type'],
        correctAnswer: 'Banking Features'
    },

    {
        id: 'tally_q100',
        question: 'Shortcut to open Company Features?',
        options: ['F11', 'F12', 'Ctrl+F11', 'Alt+F11'],
        correctAnswer: 'F11'
    },
    {
        id: 'tally_q101',
        question: 'Which shortcut key is used to open the List of Accounts?',
        options: ['L', 'A', 'Alt+A', 'Ctrl+A'],
        correctAnswer: 'A'
    },
    {
        id: 'tally_q102',
        question: 'Shortcut to select Stock Category?',
        options: ['Alt+C', 'Ctrl+S', 'Alt+S', 'Ctrl+C'],
        correctAnswer: 'Alt+S'
    },
    {
        id: 'tally_q103',
        question: 'Which key is used to activate the mouse-free mode?',
        options: ['Ctrl+M', 'Ctrl+K', 'F12', 'Alt+K'],
        correctAnswer: 'Ctrl+M'
    },
    {
        id: 'tally_q104',
        question: 'Where do you activate the Income & Expense Statement?',
        options: ['Display Menu', 'Gateway of Tally', 'Accounting Reports', 'Profit & Loss'],
        correctAnswer: 'Accounting Reports'
    },
    {
        id: 'tally_q105',
        question: 'Shortcut for “Upload” option in Tally?',
        options: ['Alt+U', 'Ctrl+U', 'Alt+L', 'Ctrl+L'],
        correctAnswer: 'Alt+U'
    },
    {
        id: 'tally_q106',
        question: 'Which report is used to check bank pending transactions?',
        options: ['Bank Reconciliation', 'Cash Book', 'Day Book', 'Outstanding'],
        correctAnswer: 'Bank Reconciliation'
    },
    {
        id: 'tally_q107',
        question: 'Which key opens the Cost Centre Summary?',
        options: ['F5', 'C', 'Alt+C', 'Ctrl+C'],
        correctAnswer: 'C'
    },
    {
        id: 'tally_q108',
        question: 'Which Voucher type is used for Sales Return?',
        options: ['Credit Note', 'Debit Note', 'Sales Voucher', 'Purchase Voucher'],
        correctAnswer: 'Credit Note'
    },
    {
        id: 'tally_q109',
        question: 'Which Voucher type is used for Purchase Return?',
        options: ['Debit Note', 'Credit Note', 'Journal', 'Payment'],
        correctAnswer: 'Debit Note'
    },
    {
        id: 'tally_q110',
        question: 'Tally saves data automatically in which format?',
        options: ['XML', 'Encrypted files', 'Binary format', 'JSON'],
        correctAnswer: 'Encrypted files'
    },

    {
        id: 'tally_q111',
        question: 'Shortcut to open Delivery Challan?',
        options: ['Alt+F8', 'Alt+F7', 'Ctrl+F7', 'Ctrl+F8'],
        correctAnswer: 'Alt+F7'
    },
    {
        id: 'tally_q112',
        question: 'Which feature allows automatic interest calculation?',
        options: ['F11 Accounting Features', 'Voucher Entry', 'Inventory Info', 'Utilities'],
        correctAnswer: 'F11 Accounting Features'
    },
    {
        id: 'tally_q113',
        question: 'Which key expands a report?',
        options: ['Alt+F1', 'Alt+F2', 'Ctrl+F2', 'Ctrl+F1'],
        correctAnswer: 'Alt+F1'
    },
    {
        id: 'tally_q114',
        question: 'Shortcut to activate Company Statistics?',
        options: ['Alt+F1', 'Alt+F3', 'Ctrl+F5', 'F11'],
        correctAnswer: 'Alt+F1'
    },
    {
        id: 'tally_q115',
        question: 'Which menu contains Stock Ageing Analysis?',
        options: ['Display More Reports', 'Inventory Info', 'Accounting Reports', 'Gateway of Tally'],
        correctAnswer: 'Display More Reports'
    },

    {
        id: 'tally_q116',
        question: 'Which feature allows budget creation?',
        options: ['Accounting Info', 'Display', 'F11 Features', 'F12 Configuration'],
        correctAnswer: 'Accounting Info'
    },
    {
        id: 'tally_q117',
        question: 'Shortcut to post-dated vouchers?',
        options: ['Ctrl+F7', 'Ctrl+F6', 'Alt+F6', 'Shift+F7'],
        correctAnswer: 'Ctrl+F7'
    },
    {
        id: 'tally_q118',
        question: 'Shortcut to open Stock Transfer Journal?',
        options: ['F7', 'Alt+F7', 'Ctrl+F7', 'Alt+J'],
        correctAnswer: 'F7'
    },
    {
        id: 'tally_q119',
        question: 'Which feature is used for Zero-valued entries?',
        options: ['Optional Vouchers', 'Cost Centres', 'Voucher Class', 'Inventory Features'],
        correctAnswer: 'Optional Vouchers'
    },
    {
        id: 'tally_q120',
        question: 'Which report shows cash-in-hand?',
        options: ['Cash Book', 'Ledger Summary', 'Day Book', 'Trial Balance'],
        correctAnswer: 'Cash Book'
    },

    {
        id: 'tally_q121',
        question: 'Shortcut for Physical Stock Voucher?',
        options: ['Alt+F10', 'Alt+F9', 'Alt+F7', 'Alt+F8'],
        correctAnswer: 'Alt+F10'
    },
    {
        id: 'tally_q122',
        question: 'Shortcut to change language?',
        options: ['Ctrl+K', 'Ctrl+L', 'Alt+L', 'Alt+Shift+L'],
        correctAnswer: 'Ctrl+K'
    },
    {
        id: 'tally_q123',
        question: 'Which feature enables Cost Centre allocation?',
        options: ['F11 Features', 'F12 Configuration', 'Gateway of Tally', 'Company Info'],
        correctAnswer: 'F11 Features'
    },
    {
        id: 'tally_q124',
        question: 'Shortcut to open E-Payments?',
        options: ['Alt+B', 'Alt+Y', 'Ctrl+Y', 'Ctrl+B'],
        correctAnswer: 'Alt+Y'
    },
    {
        id: 'tally_q125',
        question: 'Which voucher is used for bad debts?',
        options: ['Journal', 'Payment', 'Contra', 'Sales'],
        correctAnswer: 'Journal'
    },

    {
        id: 'tally_q126',
        question: 'Shortcut to quit company and return to Company Select?',
        options: ['Alt+Q', 'Ctrl+Q', 'Esc', 'Ctrl+Alt+Q'],
        correctAnswer: 'Esc'
    },
    {
        id: 'tally_q127',
        question: 'Which feature enables Stock Items with barcode?',
        options: ['Stock Item Features', 'Inventory Features', 'F12 Config', 'Voucher Class'],
        correctAnswer: 'Inventory Features'
    },
    {
        id: 'tally_q128',
        question: 'Shortcut for GST Rate Setup?',
        options: ['Alt+G', 'Alt+S', 'Ctrl+S', 'Ctrl+G'],
        correctAnswer: 'Alt+S'
    },
    {
        id: 'tally_q129',
        question: 'Which report shows Post-Dated transactions?',
        options: ['Day Book', 'Ledger Vouchers', 'Post-Dated Summary', 'Outstanding'],
        correctAnswer: 'Post-Dated Summary'
    },
    {
        id: 'tally_q130',
        question: 'Shortcut to switch between Amount and Quantity fields?',
        options: ['Tab', 'Shift+Tab', 'Ctrl+Tab', 'Alt+Tab'],
        correctAnswer: 'Tab'
    },

    {
        id: 'tally_q131',
        question: 'Shortcut to activate auto repeat narration?',
        options: ['Ctrl+R', 'Alt+R', 'Alt+N', 'Ctrl+N'],
        correctAnswer: 'Alt+N'
    },
    {
        id: 'tally_q132',
        question: 'Which feature is used for Job Costing?',
        options: ['Inventory Features', 'Accounting Features', 'Cost Centre', 'Job Costing'],
        correctAnswer: 'Inventory Features'
    },
    {
        id: 'tally_q133',
        question: 'Shortcut to open "Add Ledger" without leaving the voucher?',
        options: ['Alt+C', 'Ctrl+L', 'Ctrl+C', 'Alt+L'],
        correctAnswer: 'Alt+C'
    },
    {
        id: 'tally_q134',
        question: 'Shortcut to accept a screen?',
        options: ['Enter', 'Ctrl+Enter', 'Alt+Enter', 'Space'],
        correctAnswer: 'Enter'
    },
    {
        id: 'tally_q135',
        question: 'Which voucher type is used for Interest entries?',
        options: ['Journal', 'Receipt', 'Payment', 'Sales'],
        correctAnswer: 'Journal'
    },

    {
        id: 'tally_q136',
        question: 'Which shortcut duplicates a line in voucher?',
        options: ['Alt+2', 'Alt+D', 'Ctrl+D', 'Ctrl+C'],
        correctAnswer: 'Alt+2'
    },
    {
        id: 'tally_q137',
        question: 'Which report displays company financial ratios?',
        options: ['Ratio Analysis', 'Cash Flow', 'Trial Balance', 'Balance Sheet'],
        correctAnswer: 'Ratio Analysis'
    },
    {
        id: 'tally_q138',
        question: 'Shortcut to enable Discount column in invoice?',
        options: ['F12', 'F11', 'Ctrl+D', 'Alt+D'],
        correctAnswer: 'F12'
    },
    {
        id: 'tally_q139',
        question: 'Which option is used to configure Invoice Printing?',
        options: ['F12', 'F11', 'Alt+P', 'Ctrl+P'],
        correctAnswer: 'F12'
    },
    {
        id: 'tally_q140',
        question: 'Shortcut for GST Classification?',
        options: ['Alt+H', 'Alt+G', 'Alt+C', 'Ctrl+H'],
        correctAnswer: 'Alt+H'
    },

    /* ---- Q141–Q200 ---- */

    {
        id: 'tally_q141',
        question: 'Which feature enables automatic rounding?',
        options: ['Voucher Config', 'F12', 'Inventory Features', 'Accounting Features'],
        correctAnswer: 'Accounting Features'
    },
    {
        id: 'tally_q142',
        question: 'Shortcut to refresh any Tally report?',
        options: ['Ctrl+R', 'Alt+R', 'Ctrl+R', 'Shift+R'],
        correctAnswer: 'Ctrl+R'
    },
    {
        id: 'tally_q143',
        question: 'Shortcut to insert a voucher?',
        options: ['Alt+I', 'Alt+N', 'Ctrl+I', 'Ctrl+N'],
        correctAnswer: 'Alt+I'
    },
    {
        id: 'tally_q144',
        question: 'Which report compares two periods?',
        options: ['Auto Column', 'Comparative Reports', 'Voucher Analysis', 'Ledger Summary'],
        correctAnswer: 'Comparative Reports'
    },
    {
        id: 'tally_q145',
        question: 'Shortcut to toggle Summary/Monthly view?',
        options: ['Alt+F5', 'Alt+F1', 'Alt+F2', 'Ctrl+F5'],
        correctAnswer: 'Alt+F5'
    },

    {
        id: 'tally_q146',
        question: 'Which key is used for Price Level?',
        options: ['Alt+L', 'Ctrl+L', 'Alt+P', 'Ctrl+P'],
        correctAnswer: 'Alt+L'
    },
    {
        id: 'tally_q147',
        question: 'Shortcut to open Manufacturing Journal?',
        options: ['Alt+F7', 'Alt+F8', 'Alt+F9', 'Alt+F10'],
        correctAnswer: 'Alt+F7'
    },
    {
        id: 'tally_q148',
        question: 'Which feature is used to define multiple addresses?',
        options: ['F12 Configuration', 'Ledger Creation', 'Accounting Features', 'Voucher Class'],
        correctAnswer: 'Ledger Creation'
    },
    {
        id: 'tally_q149',
        question: 'Which report shows Stock-wise Profitability?',
        options: ['Stock Summary', 'Item-wise Profit', 'Inventory Ledger', 'Ratio Analysis'],
        correctAnswer: 'Item-wise Profit'
    },
    {
        id: 'tally_q150',
        question: 'Which voucher type is used for charity?',
        options: ['Payment', 'Receipt', 'Journal', 'Contra'],
        correctAnswer: 'Payment'
    },

    {
        id: 'tally_q151',
        question: 'Shortcut to open Outstanding Receivables?',
        options: ['Alt+R', 'Alt+O', 'O', 'Ctrl+O'],
        correctAnswer: 'Alt+O'
    },
    {
        id: 'tally_q152',
        question: 'Shortcut to open Outstanding Payables?',
        options: ['Alt+P', 'Alt+Y', 'Alt+B', 'Alt+O'],
        correctAnswer: 'Alt+Y'
    },
    {
        id: 'tally_q153',
        question: 'Which feature enables Multiple Mailing Names?',
        options: ['Ledger Setup', 'F12', 'F11', 'Inventory Features'],
        correctAnswer: 'Ledger Setup'
    },
    {
        id: 'tally_q154',
        question: 'Shortcut to view Stock Item Summary?',
        options: ['Alt+Enter', 'Alt+S', 'Ctrl+S', 'Alt+C'],
        correctAnswer: 'Alt+Enter'
    },
    {
        id: 'tally_q155',
        question: 'Shortcut to view Stock Category Summary?',
        options: ['Alt+S', 'Alt+C', 'Ctrl+S', 'C'],
        correctAnswer: 'Alt+S'
    },

    {
        id: 'tally_q156',
        question: 'Shortcut for Tracking Numbers?',
        options: ['Alt+T', 'Ctrl+T', 'Alt+G', 'Alt+N'],
        correctAnswer: 'Alt+T'
    },
    {
        id: 'tally_q157',
        question: 'Which option activates e-Way Bill?',
        options: ['GST Setup', 'Inventory Features', 'Statutory Features', 'Voucher Type'],
        correctAnswer: 'Statutory Features'
    },
    {
        id: 'tally_q158',
        question: 'Shortcut to open Receipt Note?',
        options: ['Alt+F9', 'Alt+F10', 'Alt+F7', 'Alt+F8'],
        correctAnswer: 'Alt+F9'
    },
    {
        id: 'tally_q159',
        question: 'Shortcut to open Rejection In?',
        options: ['Alt+F9', 'Alt+F6', 'Alt+F7', 'Alt+F5'],
        correctAnswer: 'Alt+F9'
    },
    {
        id: 'tally_q160',
        question: 'Which key shows Multiple Price Levels?',
        options: ['Alt+L', 'Ctrl+L', 'Alt+P', 'Ctrl+P'],
        correctAnswer: 'Alt+L'
    },

    {
        id: 'tally_q161',
        question: 'Shortcut for Stock Query?',
        options: ['Alt+Q', 'Ctrl+Q', 'Ctrl+Q', 'Ctrl+7'],
        correctAnswer: 'Alt+Q'
    },
    {
        id: 'tally_q162',
        question: 'Which voucher records outstanding expenses?',
        options: ['Journal', 'Payment', 'Sales', 'Receipt'],
        correctAnswer: 'Journal'
    },
    {
        id: 'tally_q163',
        question: 'Which key toggles Debit/Credit fields?',
        options: ['Ctrl+A', 'Ctrl+D', 'Ctrl+H', 'Ctrl+Space'],
        correctAnswer: 'Ctrl+A'
    },
    {
        id: 'tally_q164',
        question: 'Which feature activates Batch Expiry?',
        options: ['Inventory Features', 'F12 Config', 'Voucher Class', 'Accounting Features'],
        correctAnswer: 'Inventory Features'
    },
    {
        id: 'tally_q165',
        question: 'Which voucher type records prepaid expenses?',
        options: ['Journal', 'Contra', 'Payment', 'Receipt'],
        correctAnswer: 'Journal'
    },

    {
        id: 'tally_q166',
        question: 'Shortcut to switch company?',
        options: ['Alt+F1', 'Alt+F3', 'Ctrl+F1', 'Ctrl+F3'],
        correctAnswer: 'Alt+F3'
    },
    {
        id: 'tally_q167',
        question: 'Shortcut to show stock valuation?',
        options: ['Ctrl+F7', 'F7', 'Alt+F7', 'Alt+V'],
        correctAnswer: 'Ctrl+F7'
    },
    {
        id: 'tally_q168',
        question: 'Which key changes Quantity field history?',
        options: ['Ctrl+H', 'Ctrl+Q', 'Alt+Q', 'Shift+H'],
        correctAnswer: 'Ctrl+H'
    },
    {
        id: 'tally_q169',
        question: 'Which voucher records accounting adjustments?',
        options: ['Journal', 'Payment', 'Receipt', 'Contra'],
        correctAnswer: 'Journal'
    },
    {
        id: 'tally_q170',
        question: 'Shortcut for "Replace" feature in list?',
        options: ['Ctrl+H', 'Ctrl+R', 'Alt+R', 'Alt+H'],
        correctAnswer: 'Ctrl+H'
    },

    {
        id: 'tally_q171',
        question: 'Shortcut to open GST Return Reports?',
        options: ['Alt+G', 'Ctrl+G', 'Shift+G', 'G'],
        correctAnswer: 'Alt+G'
    },
    {
        id: 'tally_q172',
        question: 'Which key opens cash deposit slip?',
        options: ['Alt+D', 'Alt+S', 'Alt+R', 'Alt+B'],
        correctAnswer: 'Alt+B'
    },
    {
        id: 'tally_q173',
        question: 'Which voucher type is used for Salary Payable?',
        options: ['Journal', 'Payroll', 'Payment', 'Receipt'],
        correctAnswer: 'Payroll'
    },
    {
        id: 'tally_q174',
        question: 'Shortcut for cheque printing?',
        options: ['Alt+P', 'Alt+B', 'Ctrl+P', 'Ctrl+B'],
        correctAnswer: 'Alt+P'
    },
    {
        id: 'tally_q175',
        question: 'Which feature enables Job Work In/Out?',
        options: ['Inventory Features', 'F11 Accounting Features', 'F12 Config', 'Voucher Class'],
        correctAnswer: 'Inventory Features'
    },

    {
        id: 'tally_q176',
        question: 'Shortcut to create Godown?',
        options: ['Alt+C', 'Alt+G', 'Ctrl+G', 'Ctrl+C'],
        correctAnswer: 'Alt+C'
    },
    {
        id: 'tally_q177',
        question: 'Shortcut to view Ledger Monthly Summary?',
        options: ['Alt+F5', 'Alt+Enter', 'Ctrl+M', 'Alt+F2'],
        correctAnswer: 'Alt+F5'
    },
    {
        id: 'tally_q178',
        question: 'Which report shows Inventory Movement?',
        options: ['Movement Analysis', 'Stock Summary', 'Ratio Analysis', 'Day Book'],
        correctAnswer: 'Movement Analysis'
    },
    {
        id: 'tally_q179',
        question: 'Shortcut key to enable Bill-wise details?',
        options: ['F11', 'F12', 'Alt+B', 'Ctrl+B'],
        correctAnswer: 'F11'
    },
    {
        id: 'tally_q180',
        question: 'Which voucher is used for unrecorded expenses?',
        options: ['Journal', 'Contra', 'Receipt', 'Payment'],
        correctAnswer: 'Journal'
    },

    {
        id: 'tally_q181',
        question: 'Shortcut to activate “Show More” options?',
        options: ['Shift+Enter', 'Ctrl+Enter', 'Alt+Enter', 'Space'],
        correctAnswer: 'Shift+Enter'
    },
    {
        id: 'tally_q182',
        question: 'Which report gives cash flow projections?',
        options: ['Cash Flow', 'Fund Flow', 'Ledger Summary', 'P&L'],
        correctAnswer: 'Cash Flow'
    },
    {
        id: 'tally_q183',
        question: 'Which key loads data from existing company?',
        options: ['F3', 'Alt+F3', 'Ctrl+F3', 'Ctrl+L'],
        correctAnswer: 'F3'
    },
    {
        id: 'tally_q184',
        question: 'Shortcut to open Stock Voucher Analysis?',
        options: ['Alt+A', 'Alt+F5', 'F5', 'Ctrl+A'],
        correctAnswer: 'Alt+A'
    },
    {
        id: 'tally_q185',
        question: 'Which feature allows Price List creation?',
        options: ['Inventory Info', 'F12 Config', 'F11 Features', 'Stock Summary'],
        correctAnswer: 'Inventory Info'
    },

    {
        id: 'tally_q186',
        question: 'Which key opens voucher search?',
        options: ['Ctrl+F', 'Ctrl+S', 'Ctrl+H', 'Alt+H'],
        correctAnswer: 'Ctrl+F'
    },
    {
        id: 'tally_q187',
        question: 'Shortcut to insert narration?',
        options: ['Ctrl+I', 'Alt+N', 'Alt+I', 'Ctrl+N'],
        correctAnswer: 'Alt+N'
    },
    {
        id: 'tally_q188',
        question: 'Which key toggles Vouchers/Statistics screen?',
        options: ['Alt+F1', 'Alt+F11', 'Ctrl+F1', 'Ctrl+F2'],
        correctAnswer: 'Alt+F1'
    },
    {
        id: 'tally_q189',
        question: 'Which key opens Exception Reports?',
        options: ['E', 'Alt+E', 'Ctrl+E', 'Shift+E'],
        correctAnswer: 'E'
    },
    {
        id: 'tally_q190',
        question: 'Which voucher is used for asset purchase?',
        options: ['Journal', 'Purchase', 'Sales', 'Contra'],
        correctAnswer: 'Purchase'
    },

    {
        id: 'tally_q191',
        question: 'Shortcut to open POS Register?',
        options: ['Alt+I', 'Alt+P', 'Ctrl+P', 'Ctrl+F8'],
        correctAnswer: 'Ctrl+F8'
    },
    {
        id: 'tally_q192',
        question: 'Shortcut to open GST Rate Details?',
        options: ['Alt+S', 'Alt+G', 'Ctrl+G', 'F12'],
        correctAnswer: 'Alt+S'
    },
    {
        id: 'tally_q193',
        question: 'Which voucher records advance payments?',
        options: ['Payment', 'Receipt', 'Contra', 'Journal'],
        correctAnswer: 'Payment'
    },
    {
        id: 'tally_q194',
        question: 'Which report is used for Capital Accounts?',
        options: ['Ledger', 'Trial Balance', 'Balance Sheet', 'Group Summary'],
        correctAnswer: 'Group Summary'
    },
    {
        id: 'tally_q195',
        question: 'Shortcut to open Exception Transactions?',
        options: ['Alt+X', 'Ctrl+X', 'X', 'Shift+X'],
        correctAnswer: 'Alt+X'
    },

    {
        id: 'tally_q196',
        question: 'Which shortcut opens Payment Register?',
        options: ['Alt+F5', 'Alt+F6', 'Alt+F7', 'F5'],
        correctAnswer: 'F5'
    },
    {
        id: 'tally_q197',
        question: 'Which report displays item consumption?',
        options: ['Movement Analysis', 'Stock Journal', 'Inventory Summary', 'POS Register'],
        correctAnswer: 'Movement Analysis'
    },
    {
        id: 'tally_q198',
        question: 'Which key toggles between Cr/Dr in vouchers?',
        options: ['Ctrl+A', 'Ctrl+D', 'Ctrl+S', 'Ctrl+H'],
        correctAnswer: 'Ctrl+A'
    },
    {
        id: 'tally_q199',
        question: 'Shortcut for Multiple Mailing Details?',
        options: ['Alt+C', 'Alt+M', 'Ctrl+M', 'Alt+Shift+M'],
        correctAnswer: 'Alt+M'
    },
    {
        id: 'tally_q200',
        question: 'Which option is used to set Budget Variance Reports?',
        options: ['Display', 'Account Info', 'Budget & Scenario', 'Profit & Loss'],
        correctAnswer: 'Budget & Scenario'
    },
    {
        id: 'tally_q201',
        question: 'Which shortcut key is used to open the Godown Vouchers report?',
        options: ['Alt+Enter', 'Alt+G', 'Ctrl+G', 'Alt+V'],
        correctAnswer: 'Alt+Enter'
    },
    {
        id: 'tally_q202',
        question: 'Which voucher records purchase of fixed assets on credit?',
        options: ['Journal', 'Purchase', 'Sales', 'Payment'],
        correctAnswer: 'Journal'
    },
    {
        id: 'tally_q203',
        question: 'Which key is used to navigate back to the previous menu?',
        options: ['Esc', 'Ctrl+Q', 'Alt+Q', 'Backspace'],
        correctAnswer: 'Esc'
    },
    {
        id: 'tally_q204',
        question: 'Which feature enables Price Levels?',
        options: ['Inventory Info', 'Inventory Features', 'Accounting Features', 'Voucher Config'],
        correctAnswer: 'Inventory Features'
    },
    {
        id: 'tally_q205',
        question: 'Shortcut for GST Classification Setup?',
        options: ['Alt+H', 'Alt+G', 'Ctrl+H', 'Alt+C'],
        correctAnswer: 'Alt+H'
    },

    {
        id: 'tally_q206',
        question: 'Which key displays Group Vouchers?',
        options: ['Alt+F5', 'Alt+Enter', 'Ctrl+Enter', 'Alt+G'],
        correctAnswer: 'Alt+Enter'
    },
    {
        id: 'tally_q207',
        question: 'Which voucher type is used for bank interest income?',
        options: ['Receipt', 'Payment', 'Contra', 'Sales'],
        correctAnswer: 'Receipt'
    },
    {
        id: 'tally_q208',
        question: 'Shortcut to quickly activate any menu?',
        options: ['Alt+G', 'Ctrl+G', 'Shift+G', 'Alt+Shift+G'],
        correctAnswer: 'Alt+G'
    },
    {
        id: 'tally_q209',
        question: 'Which voucher is used to record cheque bounce?',
        options: ['Journal', 'Contra', 'Receipt', 'Payment'],
        correctAnswer: 'Journal'
    },
    {
        id: 'tally_q210',
        question: 'Shortcut to adjust columns in reports?',
        options: ['Alt+N', 'Alt+C', 'Alt+F5', 'Ctrl+F5'],
        correctAnswer: 'Alt+N'
    },

    {
        id: 'tally_q211',
        question: 'Which feature enables “Use Tracking Numbers”?',
        options: ['Inventory Features', 'Accounting Features', 'F12 Config', 'Voucher Type'],
        correctAnswer: 'Inventory Features'
    },
    {
        id: 'tally_q212',
        question: 'Shortcut for viewing Stock Movement?',
        options: ['Alt+A', 'Alt+G', 'Ctrl+G', 'Shift+M'],
        correctAnswer: 'Alt+A'
    },
    {
        id: 'tally_q213',
        question: 'Which voucher type is used for bank transfers?',
        options: ['Contra', 'Journal', 'Payment', 'Receipt'],
        correctAnswer: 'Contra'
    },
    {
        id: 'tally_q214',
        question: 'Which shortcut is used for “Show Ledger Details”?',
        options: ['Ctrl+Enter', 'Alt+Enter', 'Ctrl+L', 'Alt+L'],
        correctAnswer: 'Ctrl+Enter'
    },
    {
        id: 'tally_q215',
        question: 'Which option is used to define Bill-wise details?',
        options: ['Ledger Creation', 'Inventory Info', 'Voucher Config', 'F12'],
        correctAnswer: 'Ledger Creation'
    },

    {
        id: 'tally_q216',
        question: 'Shortcut to open Ratio Analysis?',
        options: ['Alt+R', 'R', 'Ctrl+R', 'Shift+R'],
        correctAnswer: 'R'
    },
    {
        id: 'tally_q217',
        question: 'Which voucher type records depreciation adjustment?',
        options: ['Journal', 'Payment', 'Sales', 'Contra'],
        correctAnswer: 'Journal'
    },
    {
        id: 'tally_q218',
        question: 'Shortcut for Voucher Narration?',
        options: ['Alt+N', 'F12', 'Ctrl+N', 'Alt+Ctrl+N'],
        correctAnswer: 'Alt+N'
    },
    {
        id: 'tally_q219',
        question: 'Shortcut to delete a company?',
        options: ['Alt+F3', 'Alt+D', 'Ctrl+F3', 'Shift+F3'],
        correctAnswer: 'Alt+F3'
    },
    {
        id: 'tally_q220',
        question: 'Which report shows Inventory Profit?',
        options: ['Item-wise Profit', 'Stock Summary', 'Day Book', 'Ledger Summary'],
        correctAnswer: 'Item-wise Profit'
    },

    {
        id: 'tally_q221',
        question: 'Shortcut to send data to Excel?',
        options: ['Alt+E', 'Ctrl+E', 'Alt+X', 'Ctrl+X'],
        correctAnswer: 'Alt+E'
    },
    {
        id: 'tally_q222',
        question: 'Which feature enables Credit Limit?',
        options: ['Ledger Creation', 'Inventory Features', 'Statutory Features', 'Voucher Config'],
        correctAnswer: 'Ledger Creation'
    },
    {
        id: 'tally_q223',
        question: 'Which voucher type is used for outstanding income?',
        options: ['Journal', 'Receipt', 'Payment', 'Contra'],
        correctAnswer: 'Journal'
    },
    {
        id: 'tally_q224',
        question: 'Shortcut to open Manufacturing Journal?',
        options: ['Alt+F7', 'Ctrl+F7', 'Alt+J', 'F7'],
        correctAnswer: 'Alt+F7'
    },
    {
        id: 'tally_q225',
        question: 'Which key is used to view additional details in any report?',
        options: ['Alt+F1', 'Ctrl+F1', 'Shift+F1', 'Alt+Shift+F1'],
        correctAnswer: 'Alt+F1'
    },

    {
        id: 'tally_q226',
        question: 'Which report shows the list of pending sales orders?',
        options: ['Sales Order Outstanding', 'Stock Summary', 'Ledger Summary', 'Day Book'],
        correctAnswer: 'Sales Order Outstanding'
    },
    {
        id: 'tally_q227',
        question: 'Shortcut to change the period?',
        options: ['Alt+F2', 'Ctrl+F2', 'F2', 'Shift+F2'],
        correctAnswer: 'Alt+F2'
    },
    {
        id: 'tally_q228',
        question: 'Which key enables Batch-wise stock?',
        options: ['F11', 'F12', 'Alt+B', 'Ctrl+B'],
        correctAnswer: 'F11'
    },
    {
        id: 'tally_q229',
        question: 'Which voucher type records prepaid income?',
        options: ['Journal', 'Receipt', 'Contra', 'Sales'],
        correctAnswer: 'Journal'
    },
    {
        id: 'tally_q230',
        question: 'Shortcut to toggle invoice mode during voucher entry?',
        options: ['Alt+I', 'Ctrl+I', 'Alt+V', 'Shift+I'],
        correctAnswer: 'Alt+I'
    },

    {
        id: 'tally_q231',
        question: 'Shortcut to open Scenario Management?',
        options: ['Alt+F3', 'Alt+F7', 'Alt+G', 'Alt+C'],
        correctAnswer: 'Alt+F3'
    },
    {
        id: 'tally_q232',
        question: 'Which report shows all pending purchase orders?',
        options: ['Purchase Order Outstanding', 'Order Summary', 'Stock Summary', 'Day Book'],
        correctAnswer: 'Purchase Order Outstanding'
    },
    {
        id: 'tally_q233',
        question: 'Shortcut to adjust Debit/Credit totals?',
        options: ['Ctrl+A', 'Alt+A', 'Ctrl+D', 'Shift+A'],
        correctAnswer: 'Ctrl+A'
    },
    {
        id: 'tally_q234',
        question: 'Which voucher type is used for Issue Notes?',
        options: ['Delivery Note', 'Receipt Note', 'Rejection Out', 'Rejection In'],
        correctAnswer: 'Delivery Note'
    },
    {
        id: 'tally_q235',
        question: 'Shortcut to open Rejection Out voucher?',
        options: ['Alt+F6', 'Alt+F7', 'Alt+F8', 'Alt+F9'],
        correctAnswer: 'Alt+F6'
    },

    {
        id: 'tally_q236',
        question: 'Which option is used for Cost Category Creation?',
        options: ['Accounting Info', 'Inventory Info', 'F11', 'Gateway of Tally'],
        correctAnswer: 'Accounting Info'
    },
    {
        id: 'tally_q237',
        question: 'Shortcut to repeat the narration?',
        options: ['Ctrl+R', 'Alt+R', 'Alt+N', 'Ctrl+N'],
        correctAnswer: 'Alt+N'
    },
    {
        id: 'tally_q238',
        question: 'Which feature enables Goods & Services Tax (GST)?',
        options: ['Statutory Features', 'Inventory Features', 'Accounting Features', 'F12'],
        correctAnswer: 'Statutory Features'
    },
    {
        id: 'tally_q239',
        question: 'Which key opens Stock Category Summary?',
        options: ['Alt+S', 'Alt+Enter', 'Ctrl+S', 'S'],
        correctAnswer: 'Alt+S'
    },
    {
        id: 'tally_q240',
        question: 'Shortcut to view Party Outstanding?',
        options: ['Alt+O', 'Alt+R', 'Alt+Y', 'Ctrl+O'],
        correctAnswer: 'Alt+O'
    },

    {
        id: 'tally_q241',
        question: 'Shortcut to select multiple vouchers?',
        options: ['Space', 'Shift+Space', 'Ctrl+Space', 'Alt+Space'],
        correctAnswer: 'Space'
    },
    {
        id: 'tally_q242',
        question: 'Which voucher type records interest payable?',
        options: ['Journal', 'Payment', 'Receipt', 'Contra'],
        correctAnswer: 'Journal'
    },
    {
        id: 'tally_q243',
        question: 'Which key is used to activate "Calculator Panel"?',
        options: ['Ctrl+N', 'Ctrl+M', 'Alt+M', 'Alt+N'],
        correctAnswer: 'Ctrl+N'
    },
    {
        id: 'tally_q244',
        question: 'Which report shows Party-wise sales?',
        options: ['Sales Register', 'Ledger Summary', 'Day Book', 'Stock Summary'],
        correctAnswer: 'Sales Register'
    },
    {
        id: 'tally_q245',
        question: 'Shortcut to open Purchase Register?',
        options: ['F9', 'Alt+F9', 'Ctrl+F9', 'Alt+P'],
        correctAnswer: 'F9'
    },

    {
        id: 'tally_q246',
        question: 'Which feature manages Cost Centres?',
        options: ['F11 Features', 'F12 Config', 'Voucher Types', 'Inventory Features'],
        correctAnswer: 'F11 Features'
    },
    {
        id: 'tally_q247',
        question: 'Shortcut to open Stock Journal Register?',
        options: ['F7', 'Alt+F7', 'Ctrl+F7', 'Alt+J'],
        correctAnswer: 'F7'
    },
    {
        id: 'tally_q248',
        question: 'Which option enables Auto Backup?',
        options: ['F12', 'F11', 'Gateway of Tally', 'Company Info'],
        correctAnswer: 'F12'
    },
    {
        id: 'tally_q249',
        question: 'Shortcut to view Ledger Monthly Summary?',
        options: ['Alt+F5', 'Alt+F1', 'Ctrl+M', 'Shift+F5'],
        correctAnswer: 'Alt+F5'
    },
    {
        id: 'tally_q250',
        question: 'Which key toggles Itemwise/Accountwise view?',
        options: ['Alt+I', 'Ctrl+I', 'Alt+V', 'Ctrl+V'],
        correctAnswer: 'Alt+V'
    },

    {
        id: 'tally_q251',
        question: 'Which report displays Cash/Bank Books?',
        options: ['Cash/Bank Book', 'Day Book', 'Ledger Vouchers', 'Accounting Reports'],
        correctAnswer: 'Cash/Bank Book'
    },
    {
        id: 'tally_q252',
        question: 'Shortcut to open Payroll Reports?',
        options: ['Alt+P', 'P', 'Ctrl+P', 'Shift+P'],
        correctAnswer: 'P'
    },
    {
        id: 'tally_q253',
        question: 'Which voucher type records provision for expenses?',
        options: ['Journal', 'Payment', 'Receipt', 'Contra'],
        correctAnswer: 'Journal'
    },
    {
        id: 'tally_q254',
        question: 'Shortcut to navigate to Display More Reports?',
        options: ['Alt+F1', 'Alt+F5', 'Alt+F2', 'Alt+D'],
        correctAnswer: 'Alt+F1'
    },
    {
        id: 'tally_q255',
        question: 'Which key shows order-wise pending details?',
        options: ['Alt+O', 'Ctrl+O', 'Shift+O', 'O'],
        correctAnswer: 'Alt+O'
    },

    {
        id: 'tally_q256',
        question: 'Shortcut key to reorder columns?',
        options: ['Alt+C', 'Alt+H', 'Alt+N', 'Ctrl+C'],
        correctAnswer: 'Alt+C'
    },
    {
        id: 'tally_q257',
        question: 'Which voucher type is used for discount allowed?',
        options: ['Journal', 'Receipt', 'Payment', 'Contra'],
        correctAnswer: 'Journal'
    },
    {
        id: 'tally_q258',
        question: 'Which feature enables Payroll?',
        options: ['F11 Accounting Features', 'F11 Statutory Features', 'F12 Config', 'Inventory Features'],
        correctAnswer: 'F11 Accounting Features'
    },
    {
        id: 'tally_q259',
        question: 'Shortcut to open E-Payments setup?',
        options: ['Alt+Y', 'Alt+P', 'Ctrl+Y', 'Shift+Y'],
        correctAnswer: 'Alt+Y'
    },
    {
        id: 'tally_q260',
        question: 'Which report shows Bank Book?',
        options: ['Cash/Bank Book', 'Ledger Summary', 'Fund Flow', 'Stock Summary'],
        correctAnswer: 'Cash/Bank Book'
    },

    {
        id: 'tally_q261',
        question: 'Shortcut to open Ledger Vouchers?',
        options: ['Alt+Enter', 'Ctrl+Enter', 'Alt+V', 'Ctrl+V'],
        correctAnswer: 'Alt+Enter'
    },
    {
        id: 'tally_q262',
        question: 'Which key is used for Cost Category Report?',
        options: ['C', 'Alt+C', 'Ctrl+C', 'Category'],
        correctAnswer: 'C'
    },
    {
        id: 'tally_q263',
        question: 'Shortcut to duplicate a voucher?',
        options: ['Alt+2', 'Ctrl+D', 'Alt+D', 'Shift+D'],
        correctAnswer: 'Alt+2'
    },
    {
        id: 'tally_q264',
        question: 'Which voucher records adjustment for provisions?',
        options: ['Journal', 'Contra', 'Payment', 'Receipt'],
        correctAnswer: 'Journal'
    },
    {
        id: 'tally_q265',
        question: 'Shortcut to view Job Work Out Reports?',
        options: ['Alt+J', 'Ctrl+J', 'Shift+J', 'J'],
        correctAnswer: 'Alt+J'
    },

    {
        id: 'tally_q266',
        question: 'Shortcut to edit a ledger from voucher?',
        options: ['Ctrl+Enter', 'Alt+Enter', 'Ctrl+L', 'Alt+L'],
        correctAnswer: 'Ctrl+Enter'
    },
    {
        id: 'tally_q267',
        question: 'Which report displays credit/debit notes summary?',
        options: ['Registers', 'Day Book', 'Ledger Summary', 'Outstanding'],
        correctAnswer: 'Registers'
    },
    {
        id: 'tally_q268',
        question: 'Which key toggles current screen to Calculator?',
        options: ['Ctrl+N', 'Ctrl+M', 'Alt+N', 'Shift+N'],
        correctAnswer: 'Ctrl+N'
    },
    {
        id: 'tally_q269',
        question: 'Which option sets Bank Details in Ledger?',
        options: ['Ledger Creation', 'Banking Features', 'F12', 'Voucher Config'],
        correctAnswer: 'Ledger Creation'
    },
    {
        id: 'tally_q270',
        question: 'Shortcut to open GST Summary?',
        options: ['Alt+G', 'Ctrl+G', 'G', 'Shift+G'],
        correctAnswer: 'Alt+G'
    },

    {
        id: 'tally_q271',
        question: 'Which voucher type records capital introduction?',
        options: ['Journal', 'Receipt', 'Contra', 'Payment'],
        correctAnswer: 'Journal'
    },
    {
        id: 'tally_q272',
        question: 'Shortcut to access Balance Sheet?',
        options: ['B', 'Alt+B', 'Ctrl+B', 'Shift+B'],
        correctAnswer: 'B'
    },
    {
        id: 'tally_q273',
        question: 'Which feature creates multiple stock items?',
        options: ['Multiple Creation', 'Inventory Info', 'F12 Config', 'Accounting Info'],
        correctAnswer: 'Multiple Creation'
    },
    {
        id: 'tally_q274',
        question: 'Shortcut to print a report?',
        options: ['Alt+P', 'Ctrl+P', 'P', 'Shift+P'],
        correctAnswer: 'Alt+P'
    },
    {
        id: 'tally_q275',
        question: 'Which key shows Cost Centre-wise breakup?',
        options: ['Ctrl+I', 'Ctrl+C', 'Alt+C', 'Shift+C'],
        correctAnswer: 'Ctrl+I'
    },

    {
        id: 'tally_q276',
        question: 'Which voucher type records bank charges?',
        options: ['Journal', 'Payment', 'Contra', 'Receipt'],
        correctAnswer: 'Journal'
    },
    {
        id: 'tally_q277',
        question: 'Shortcut for Day Book sorting?',
        options: ['Alt+S', 'Ctrl+S', 'Shift+S', 'Alt+Shift+S'],
        correctAnswer: 'Alt+S'
    },
    {
        id: 'tally_q278',
        question: 'Which option enables alternate units?',
        options: ['Inventory Features', 'F12', 'Stock Item Creation', 'Voucher Config'],
        correctAnswer: 'Inventory Features'
    },
    {
        id: 'tally_q279',
        question: 'Shortcut to open Purchase Order Book?',
        options: ['Alt+F4', 'Alt+F9', 'Ctrl+F9', 'F9'],
        correctAnswer: 'Alt+F4'
    },
    {
        id: 'tally_q280',
        question: 'Which key displays Display Statistics?',
        options: ['Alt+F1', 'Alt+F3', 'Alt+D', 'Ctrl+D'],
        correctAnswer: 'Alt+F1'
    },

    {
        id: 'tally_q281',
        question: 'Which voucher type records supplier advances?',
        options: ['Payment', 'Contra', 'Receipt', 'Journal'],
        correctAnswer: 'Payment'
    },
    {
        id: 'tally_q282',
        question: 'Shortcut to apply Inventory Filters?',
        options: ['Alt+F12', 'Alt+F5', 'Ctrl+F12', 'Shift+F12'],
        correctAnswer: 'Alt+F12'
    },
    {
        id: 'tally_q283',
        question: 'Which option enables Auto Bank Reconciliation?',
        options: ['Banking Features', 'Voucher Config', 'Ledger Setup', 'F11 Features'],
        correctAnswer: 'Banking Features'
    },
    {
        id: 'tally_q284',
        question: 'Shortcut to export report?',
        options: ['Alt+E', 'Ctrl+E', 'Shift+E', 'Alt+Shift+E'],
        correctAnswer: 'Alt+E'
    },
    {
        id: 'tally_q285',
        question: 'Which key toggles Godown Summary?',
        options: ['G', 'Alt+G', 'Ctrl+G', 'Shift+G'],
        correctAnswer: 'G'
    },

    {
        id: 'tally_q286',
        question: 'Which voucher type is used for recording free samples?',
        options: ['Stock Journal', 'Journal', 'Contra', 'Rejection Out'],
        correctAnswer: 'Stock Journal'
    },
    {
        id: 'tally_q287',
        question: 'Shortcut to accept a voucher entry?',
        options: ['Enter', 'Ctrl+A', 'Alt+Enter', 'Space'],
        correctAnswer: 'Ctrl+A'
    },
    {
        id: 'tally_q288',
        question: 'Which option enables e-Invoicing?',
        options: ['Statutory Features', 'F11 Accounting', 'Voucher Type', 'Inventory Features'],
        correctAnswer: 'Statutory Features'
    },
    {
        id: 'tally_q289',
        question: 'Shortcut to view applicable GST rate?',
        options: ['Alt+S', 'Alt+H', 'Ctrl+H', 'G'],
        correctAnswer: 'Alt+S'
    },
    {
        id: 'tally_q290',
        question: 'Which allowance is managed under Payroll Features?',
        options: ['DA', 'GST', 'Stock Variance', 'Interest'],
        correctAnswer: 'DA'
    },

    {
        id: 'tally_q291',
        question: 'Which voucher type records write-off of inventory?',
        options: ['Stock Journal', 'Journal', 'Contra', 'Payment'],
        correctAnswer: 'Stock Journal'
    },
    {
        id: 'tally_q292',
        question: 'Shortcut to show only pending vouchers?',
        options: ['Alt+F8', 'Ctrl+F8', 'Shift+F8', 'Alt+Shift+F8'],
        correctAnswer: 'Alt+F8'
    },
    {
        id: 'tally_q293',
        question: 'Which feature allows Cost Centre Breakup?',
        options: ['F11', 'F12', 'Ledger Setup', 'Voucher Config'],
        correctAnswer: 'F11'
    },
    {
        id: 'tally_q294',
        question: 'Shortcut to change narration?',
        options: ['Alt+N', 'Ctrl+N', 'Alt+Enter', 'Ctrl+Enter'],
        correctAnswer: 'Alt+N'
    },
    {
        id: 'tally_q295',
        question: 'Which report shows opening and closing stock?',
        options: ['Stock Summary', 'Inventory Ledger', 'Movement Analysis', 'Day Book'],
        correctAnswer: 'Stock Summary'
    },

    {
        id: 'tally_q296',
        question: 'Shortcut to apply a filter in Display Menu?',
        options: ['Alt+F12', 'Ctrl+F12', 'Shift+F12', 'Alt+Shift+F12'],
        correctAnswer: 'Alt+F12'
    },
    {
        id: 'tally_q297',
        question: 'Which voucher type records Loss by Fire?',
        options: ['Journal', 'Payment', 'Receipt', 'Contra'],
        correctAnswer: 'Journal'
    },
    {
        id: 'tally_q298',
        question: 'Shortcut for columnar analysis?',
        options: ['Alt+F5', 'Alt+F1', 'Alt+F6', 'Ctrl+F5'],
        correctAnswer: 'Alt+F5'
    },
    {
        id: 'tally_q299',
        question: 'Which key views Stock Ageing Analysis?',
        options: ['Alt+A', 'Alt+G', 'Ctrl+G', 'Shift+A'],
        correctAnswer: 'Alt+A'
    },
    {
        id: 'tally_q300',
        question: 'Which report displays the complete financial position of a company?',
        options: ['Balance Sheet', 'P&L', 'Ratio Analysis', 'Cash Flow'],
        correctAnswer: 'Balance Sheet'
    }
]


,
    'ccc': [
    {
        id: 'ccc_q1',
        question: 'What does CPU stand for?',
        options: ['Central Processing Unit', 'Central Program Unit', 'Computer Processing Unit', 'Control Processing Unit'],
        correctAnswer: 'Central Processing Unit'
    },
    {
        id: 'ccc_q2',
        question: 'Which device is used for long-term storage?',
        options: ['RAM', 'ROM', 'Hard Disk', 'CPU'],
        correctAnswer: 'Hard Disk'
    },
    {
        id: 'ccc_q3',
        question: 'Which key is used to copy selected text in Windows?',
        options: ['Ctrl+V', 'Ctrl+C', 'Ctrl+X', 'Ctrl+Z'],
        correctAnswer: 'Ctrl+C'
    },
    {
        id: 'ccc_q4',
        question: 'Which software is used to create spreadsheets?',
        options: ['MS Word', 'MS Excel', 'MS PowerPoint', 'Notepad'],
        correctAnswer: 'MS Excel'
    },
    {
        id: 'ccc_q5',
        question: 'Which of the following is an input device?',
        options: ['Monitor', 'Printer', 'Keyboard', 'Speaker'],
        correctAnswer: 'Keyboard'
    },
    {
        id: 'ccc_q6',
        question: 'What is the file extension for a Word document (older versions)?',
        options: ['.doc', '.xls', '.ppt', '.txt'],
        correctAnswer: '.doc'
    },
    {
        id: 'ccc_q7',
        question: 'Which key is used to paste clipboard content?',
        options: ['Ctrl+P', 'Ctrl+V', 'Ctrl+X', 'Ctrl+C'],
        correctAnswer: 'Ctrl+V'
    },
    {
        id: 'ccc_q8',
        question: 'Which program is used to send and receive emails?',
        options: ['Web browser', 'Email client', 'Spreadsheet', 'Image editor'],
        correctAnswer: 'Email client'
    },
    {
        id: 'ccc_q9',
        question: 'Which of the following is an example of an operating system?',
        options: ['Microsoft Office', 'Windows 10', 'Google Chrome', 'Adobe Reader'],
        correctAnswer: 'Windows 10'
    },
    {
        id: 'ccc_q10',
        question: 'Which component temporarily stores data for quick access?',
        options: ['Hard Disk', 'Monitor', 'RAM', 'Keyboard'],
        correctAnswer: 'RAM'
    },
    {
        id: 'ccc_q11',
        question: 'Which key combination opens Task Manager in Windows?',
        options: ['Ctrl+Alt+Del', 'Ctrl+Shift+Esc', 'Alt+F4', 'Both A and B'],
        correctAnswer: 'Both A and B'
    },
    {
        id: 'ccc_q12',
        question: 'Which protocol is used to view web pages?',
        options: ['FTP', 'HTTP', 'SMTP', 'POP3'],
        correctAnswer: 'HTTP'
    },
    {
        id: 'ccc_q13',
        question: 'Which of these is a spreadsheet function to add numbers?',
        options: ['=SUM()', '=ADD()', '=TOTAL()', '=PLUS()'],
        correctAnswer: '=SUM()'
    },
    {
        id: 'ccc_q14',
        question: 'Which is a presentation software?',
        options: ['MS Word', 'MS Excel', 'MS PowerPoint', 'MS Access'],
        correctAnswer: 'MS PowerPoint'
    },
    {
        id: 'ccc_q15',
        question: 'Which is used to browse the internet?',
        options: ['Web browser', 'Email client', 'Antivirus', 'Firewall'],
        correctAnswer: 'Web browser'
    },
    {
        id: 'ccc_q16',
        question: 'Which key is used to undo an action?',
        options: ['Ctrl+Y', 'Ctrl+Z', 'Ctrl+U', 'Ctrl+R'],
        correctAnswer: 'Ctrl+Z'
    },
    {
        id: 'ccc_q17',
        question: 'Which storage is removable and portable?',
        options: ['SSD', 'HDD', 'USB Flash Drive', 'RAM'],
        correctAnswer: 'USB Flash Drive'
    },
    {
        id: 'ccc_q18',
        question: 'Which of the following is a search engine?',
        options: ['Google', 'Windows', 'Excel', 'PowerPoint'],
        correctAnswer: 'Google'
    },
    {
        id: 'ccc_q19',
        question: 'Which is a valid email format?',
        options: ['user@domain', 'userdomain.com', 'user@domain.com', 'user@domain,com'],
        correctAnswer: 'user@domain.com'
    },
    {
        id: 'ccc_q20',
        question: 'Which key moves the cursor to the beginning of the line?',
        options: ['Home', 'End', 'Page Up', 'Page Down'],
        correctAnswer: 'Home'
    },
    {
        id: 'ccc_q21',
        question: 'Which of these protects a computer from viruses?',
        options: ['Firewall', 'Antivirus', 'Browser', 'Printer'],
        correctAnswer: 'Antivirus'
    },
    {
        id: 'ccc_q22',
        question: 'Which Excel feature allows filtering rows based on criteria?',
        options: ['Sort', 'Filter', 'Pivot Table', 'Chart'],
        correctAnswer: 'Filter'
    },
    {
        id: 'ccc_q23',
        question: 'What is the basic unit of data in computing?',
        options: ['Byte', 'Bit', 'Packet', 'Block'],
        correctAnswer: 'Bit'
    },
    {
        id: 'ccc_q24',
        question: 'Which key is used to open a new browser tab?',
        options: ['Ctrl+T', 'Ctrl+N', 'Ctrl+W', 'Ctrl+Shift+T'],
        correctAnswer: 'Ctrl+T'
    },
    {
        id: 'ccc_q25',
        question: 'Which of the following is cloud storage?',
        options: ['Google Drive', 'Hard Disk', 'USB Drive', 'DVD'],
        correctAnswer: 'Google Drive'
    },
    {
        id: 'ccc_q26',
        question: 'Which file extension is used for Excel workbook (newer versions)?',
        options: ['.xls', '.xlsx', '.docx', '.pptx'],
        correctAnswer: '.xlsx'
    },
    {
        id: 'ccc_q27',
        question: 'Which key combination saves a file in most applications?',
        options: ['Ctrl+S', 'Ctrl+P', 'Ctrl+O', 'Ctrl+F'],
        correctAnswer: 'Ctrl+S'
    },
    {
        id: 'ccc_q28',
        question: 'Which is used to create databases?',
        options: ['MS Access', 'MS Word', 'MS Paint', 'Notepad'],
        correctAnswer: 'MS Access'
    },
    {
        id: 'ccc_q29',
        question: 'Which of the following is a web address?',
        options: ['www.example.com', 'example@com', 'http//example', 'example.com@www'],
        correctAnswer: 'www.example.com'
    },
    {
        id: 'ccc_q30',
        question: 'Which key deletes the character to the right of the cursor?',
        options: ['Backspace', 'Delete', 'Esc', 'Enter'],
        correctAnswer: 'Delete'
    },
    {
        id: 'ccc_q31',
        question: 'Which of these is a graphics file format?',
        options: ['.mp3', '.jpg', '.doc', '.xls'],
        correctAnswer: '.jpg'
    },
    {
        id: 'ccc_q32',
        question: 'What does HTTP stand for?',
        options: ['HyperText Transfer Protocol', 'HighText Transfer Protocol', 'Hyperlink Transfer Protocol', 'HyperText Transmission Protocol'],
        correctAnswer: 'HyperText Transfer Protocol'
    },
    {
        id: 'ccc_q33',
        question: 'Which Excel chart type is best for showing parts of a whole?',
        options: ['Line Chart', 'Bar Chart', 'Pie Chart', 'Scatter Plot'],
        correctAnswer: 'Pie Chart'
    },
    {
        id: 'ccc_q34',
        question: 'Which function returns the largest number in Excel?',
        options: ['=MAX()', '=MIN()', '=LARGE()', '=BIG()'],
        correctAnswer: '=MAX()'
    },
    {
        id: 'ccc_q35',
        question: 'Which is the correct way to start a PowerPoint slide show?',
        options: ['F5', 'F4', 'Ctrl+S', 'Alt+F4'],
        correctAnswer: 'F5'
    },
    {
        id: 'ccc_q36',
        question: 'Which device displays the output of a computer?',
        options: ['Printer', 'Monitor', 'Scanner', 'Keyboard'],
        correctAnswer: 'Monitor'
    },
    {
        id: 'ccc_q37',
        question: 'Which key is used to select all content?',
        options: ['Ctrl+A', 'Ctrl+S', 'Ctrl+P', 'Ctrl+Z'],
        correctAnswer: 'Ctrl+A'
    },
    {
        id: 'ccc_q38',
        question: 'Which of these is NOT an operating system?',
        options: ['Linux', 'Android', 'Microsoft Word', 'iOS'],
        correctAnswer: 'Microsoft Word'
    },
    {
        id: 'ccc_q39',
        question: 'Which protocol is used to send emails?',
        options: ['HTTP', 'SMTP', 'FTP', 'IMAP'],
        correctAnswer: 'SMTP'
    },
    {
        id: 'ccc_q40',
        question: 'What is phishing?',
        options: ['A way to speed up internet', 'A cyber attack to steal information', 'A backup method', 'A printer setting'],
        correctAnswer: 'A cyber attack to steal information'
    },
    {
        id: 'ccc_q41',
        question: 'Which MS Word view shows pages as they will be printed?',
        options: ['Web Layout', 'Print Layout', 'Outline', 'Draft'],
        correctAnswer: 'Print Layout'
    },
    {
        id: 'ccc_q42',
        question: 'Which Excel feature is used to summarize large datasets quickly?',
        options: ['Sort', 'Filter', 'Pivot Table', 'Conditional Formatting'],
        correctAnswer: 'Pivot Table'
    },
    {
        id: 'ccc_q43',
        question: 'Which of the following is used to protect data from unauthorized access?',
        options: ['Encryption', 'Formatting', 'Defragmentation', 'Compression'],
        correctAnswer: 'Encryption'
    },
    {
        id: 'ccc_q44',
        question: 'Which key combination closes the current window?',
        options: ['Alt+F4', 'Ctrl+W', 'Ctrl+Q', 'Both A and B'],
        correctAnswer: 'Both A and B'
    },
    {
        id: 'ccc_q45',
        question: 'Which HTML tag is used for inserting an image?',
        options: ['<a>', '<img>', '<p>', '<div>'],
        correctAnswer: '<img>'
    },
    {
        id: 'ccc_q46',
        question: 'Which of these is an example of application software?',
        options: ['Windows', 'Linux', 'MS Excel', 'BIOS'],
        correctAnswer: 'MS Excel'
    },
    {
        id: 'ccc_q47',
        question: 'Which is used to manage files and folders on Windows?',
        options: ['Task Manager', 'File Explorer', 'Control Panel', 'Registry Editor'],
        correctAnswer: 'File Explorer'
    },
    {
        id: 'ccc_q48',
        question: 'Which key is used to repeat last action in many programs?',
        options: ['Ctrl+Y', 'Ctrl+Z', 'Ctrl+R', 'Ctrl+T'],
        correctAnswer: 'Ctrl+Y'
    },
    {
        id: 'ccc_q49',
        question: 'Which Excel formula calculates the average of a range?',
        options: ['=MEAN()', '=AVERAGE()', '=AVG()', '=MID()'],
        correctAnswer: '=AVERAGE()'
    },
    {
        id: 'ccc_q50',
        question: 'Which of the following is used to create folders?',
        options: ['Right-click > New > Folder', 'Ctrl+N in File Explorer', 'Both A and B', 'Alt+F4'],
        correctAnswer: 'Right-click > New > Folder'
    },
    {
        id: 'ccc_q51',
        question: 'What is the full form of URL?',
        options: ['Universal Resource Locator', 'Uniform Resource Locator', 'Universal Reference Link', 'Uniform Reference Link'],
        correctAnswer: 'Uniform Resource Locator'
    },
    {
        id: 'ccc_q52',
        question: 'Which of these is used for video calling over the internet?',
        options: ['MS Word', 'Skype', 'Excel', 'Notepad'],
        correctAnswer: 'Skype'
    },
    {
        id: 'ccc_q53',
        question: 'Which key moves the cursor one word to the left in many editors?',
        options: ['Ctrl+Left Arrow', 'Alt+Left Arrow', 'Shift+Left Arrow', 'Home'],
        correctAnswer: 'Ctrl+Left Arrow'
    },
    {
        id: 'ccc_q54',
        question: 'Which of these media is used for backup?',
        options: ['DVD', 'External HDD', 'Cloud storage', 'All of the above'],
        correctAnswer: 'All of the above'
    },
    {
        id: 'ccc_q55',
        question: 'Which PowerPoint view is used to arrange slides?',
        options: ['Slide Sorter', 'Normal', 'Notes Page', 'Reading View'],
        correctAnswer: 'Slide Sorter'
    },
    {
        id: 'ccc_q56',
        question: 'Which is the primary function of an operating system?',
        options: ['Run application software', 'Manage hardware resources', 'Provide user interface', 'All of the above'],
        correctAnswer: 'All of the above'
    },
    {
        id: 'ccc_q57',
        question: 'Which Excel shortcut inserts current date into a cell?',
        options: ['Ctrl+;', 'Ctrl+Shift+;', 'Ctrl+:', 'Ctrl+D'],
        correctAnswer: 'Ctrl+;'
    },
    {
        id: 'ccc_q58',
        question: 'Which device converts digital signals to analog for telephone lines?',
        options: ['Router', 'Modem', 'Switch', 'Hub'],
        correctAnswer: 'Modem'
    },
    {
        id: 'ccc_q59',
        question: 'What is an IP address?',
        options: ['Internet Provider', 'Unique address of a device on network', 'Email address', 'Web address'],
        correctAnswer: 'Unique address of a device on network'
    },
    {
        id: 'ccc_q60',
        question: 'Which option in Word checks spelling and grammar?',
        options: ['Review > Spelling & Grammar', 'View > Spelling', 'Insert > Spelling', 'Home > Spelling'],
        correctAnswer: 'Review > Spelling & Grammar'
    },
    {
        id: 'ccc_q61',
        question: 'Which of the following is a presentation file extension?',
        options: ['.pptx', '.docx', '.xlsx', '.txt'],
        correctAnswer: '.pptx'
    },
    {
        id: 'ccc_q62',
        question: 'Which key is used to rename a selected file in Windows?',
        options: ['F2', 'F3', 'F4', 'F5'],
        correctAnswer: 'F2'
    },
    {
        id: 'ccc_q63',
        question: 'Which Excel feature highlights cells based on conditions?',
        options: ['Pivot Table', 'Conditional Formatting', 'Data Validation', 'Filter'],
        correctAnswer: 'Conditional Formatting'
    },
    {
        id: 'ccc_q64',
        question: 'Which of these is a web browser?',
        options: ['Google Chrome', 'Outlook', 'MS Word', 'Excel'],
        correctAnswer: 'Google Chrome'
    },
    {
        id: 'ccc_q65',
        question: 'Which key opens the Find dialog in most applications?',
        options: ['Ctrl+F', 'Ctrl+H', 'Ctrl+G', 'Ctrl+S'],
        correctAnswer: 'Ctrl+F'
    },
    {
        id: 'ccc_q66',
        question: 'Which of the following is used to compress files?',
        options: ['WinZip', 'Notepad', 'Paint', 'Calculator'],
        correctAnswer: 'WinZip'
    },
    {
        id: 'ccc_q67',
        question: 'Which e-mail protocol is used to receive emails from server to client keeping them on server?',
        options: ['POP3', 'SMTP', 'IMAP', 'FTP'],
        correctAnswer: 'IMAP'
    },
    {
        id: 'ccc_q68',
        question: 'Which component initializes hardware during booting?',
        options: ['Operating System', 'BIOS/UEFI', 'RAM', 'Application Software'],
        correctAnswer: 'BIOS/UEFI'
    },
    {
        id: 'ccc_q69',
        question: 'Which PowerPoint shortcut starts slideshow from current slide?',
        options: ['Shift+F5', 'F5', 'Alt+F5', 'Ctrl+F5'],
        correctAnswer: 'Shift+F5'
    },
    {
        id: 'ccc_q70',
        question: 'Which of these is used to create charts in Excel?',
        options: ['Insert > Chart', 'Data > Chart', 'View > Chart', 'Format > Chart'],
        correctAnswer: 'Insert > Chart'
    },
    {
        id: 'ccc_q71',
        question: 'Which key selects the next word while typing (in many editors)?',
        options: ['Ctrl+Shift+Right Arrow', 'Ctrl+Right Arrow', 'Shift+Right Arrow', 'Alt+Right Arrow'],
        correctAnswer: 'Ctrl+Shift+Right Arrow'
    },
    {
        id: 'ccc_q72',
        question: 'Which of the following is a database query language?',
        options: ['HTML', 'CSS', 'SQL', 'XML'],
        correctAnswer: 'SQL'
    },
    {
        id: 'ccc_q73',
        question: 'Which setting controls screen brightness on a laptop?',
        options: ['Display settings', 'Power settings', 'Both A and B', 'Sound settings'],
        correctAnswer: 'Both A and B'
    },
    {
        id: 'ccc_q74',
        question: 'Which of the following is used to create hyperlinks in Word?',
        options: ['Insert > Hyperlink', 'Home > Link', 'View > Link', 'References > Link'],
        correctAnswer: 'Insert > Hyperlink'
    },
    {
        id: 'ccc_q75',
        question: 'Which option in Excel helps prevent invalid data entry?',
        options: ['Data Validation', 'Conditional Formatting', 'Pivot Table', 'Freeze Panes'],
        correctAnswer: 'Data Validation'
    },
    {
        id: 'ccc_q76',
        question: 'Which of the following is NOT a storage unit?',
        options: ['Kilobyte', 'Megabyte', 'Gigabyte', 'Gigahertz'],
        correctAnswer: 'Gigahertz'
    },
    {
        id: 'ccc_q77',
        question: 'Which of these is used to change page orientation in Word?',
        options: ['Insert > Orientation', 'Layout > Orientation', 'View > Orientation', 'Home > Orientation'],
        correctAnswer: 'Layout > Orientation'
    },
    {
        id: 'ccc_q78',
        question: 'Which web protocol is secure version of HTTP?',
        options: ['SFTP', 'HTTPS', 'FTPS', 'SMTPS'],
        correctAnswer: 'HTTPS'
    },
    {
        id: 'ccc_q79',
        question: 'Which key combination opens a private/incognito window in most browsers?',
        options: ['Ctrl+Shift+N', 'Ctrl+Shift+P', 'Ctrl+N', 'Ctrl+P'],
        correctAnswer: 'Ctrl+Shift+N'
    },
    {
        id: 'ccc_q80',
        question: 'Which of these is a presentation layout option in PowerPoint?',
        options: ['Title Slide', 'Blank', 'Content with Caption', 'All of the above'],
        correctAnswer: 'All of the above'
    },
    {
        id: 'ccc_q81',
        question: 'Which Excel function returns the number of cells that contain numbers?',
        options: ['=COUNT()', '=COUNTA()', '=COUNTIF()', '=SUM()'],
        correctAnswer: '=COUNT()'
    },
    {
        id: 'ccc_q82',
        question: 'Which of the following describes malware that demands ransom?',
        options: ['Virus', 'Worm', 'Ransomware', 'Spyware'],
        correctAnswer: 'Ransomware'
    },
    {
        id: 'ccc_q83',
        question: 'Which tool is used to remove dust from inside a computer case?',
        options: ['Vacuum cleaner', 'Compressed air', 'Wet cloth', 'Oven'],
        correctAnswer: 'Compressed air'
    },
    {
        id: 'ccc_q84',
        question: 'Which Excel formula concatenates text in newer versions?',
        options: ['=CONCATENATE()', '=CONCAT()', '=JOIN()', '=MERGE()'],
        correctAnswer: '=CONCAT()'
    },
    {
        id: 'ccc_q85',
        question: 'Which of these is used to schedule tasks in Windows?',
        options: ['Task Manager', 'Task Scheduler', 'Services', 'Event Viewer'],
        correctAnswer: 'Task Scheduler'
    },
    {
        id: 'ccc_q86',
        question: 'Which is the default search engine in many browsers (may vary)?',
        options: ['Bing', 'Yahoo', 'Google', 'DuckDuckGo'],
        correctAnswer: 'Google'
    },
    {
        id: 'ccc_q87',
        question: 'Which file format is typically used for plain text?',
        options: ['.txt', '.docx', '.pdf', '.xlsx'],
        correctAnswer: '.txt'
    },
    {
        id: 'ccc_q88',
        question: 'Which shortcut hides all windows and shows the desktop?',
        options: ['Windows+D', 'Windows+M', 'Alt+Tab', 'Ctrl+D'],
        correctAnswer: 'Windows+D'
    },
    {
        id: 'ccc_q89',
        question: 'Which feature in Word arranges text into columns?',
        options: ['Layout > Columns', 'Home > Columns', 'Insert > Columns', 'View > Columns'],
        correctAnswer: 'Layout > Columns'
    },
    {
        id: 'ccc_q90',
        question: 'Which of the following is used to format cells conditionally in Excel?',
        options: ['Home > Conditional Formatting', 'Insert > Conditional', 'View > Conditional', 'Data > Conditional'],
        correctAnswer: 'Home > Conditional Formatting'
    },
    {
        id: 'ccc_q91',
        question: 'Which is used to block unwanted network access on a computer?',
        options: ['Antivirus', 'Firewall', 'Defragmenter', 'Disk Cleanup'],
        correctAnswer: 'Firewall'
    },
    {
        id: 'ccc_q92',
        question: 'Which key is used to open Run dialog in Windows?',
        options: ['Windows+R', 'Windows+E', 'Ctrl+R', 'Alt+R'],
        correctAnswer: 'Windows+R'
    },
    {
        id: 'ccc_q93',
        question: 'Which chart shows trends over time in Excel?',
        options: ['Column Chart', 'Pie Chart', 'Line Chart', 'Scatter Plot'],
        correctAnswer: 'Line Chart'
    },
    {
        id: 'ccc_q94',
        question: 'Which application is suitable for creating flyers and posters?',
        options: ['MS Paint', 'MS Publisher', 'MS Excel', 'MS Access'],
        correctAnswer: 'MS Publisher'
    },
    {
        id: 'ccc_q95',
        question: 'Which of these is a non-volatile memory?',
        options: ['RAM', 'Cache', 'ROM', 'Registers'],
        correctAnswer: 'ROM'
    },
    {
        id: 'ccc_q96',
        question: 'Which option in Word creates a table of contents automatically?',
        options: ['References > Table of Contents', 'Insert > Table', 'View > Table', 'Layout > Table'],
        correctAnswer: 'References > Table of Contents'
    },
    {
        id: 'ccc_q97',
        question: 'Which Excel shortcut copies the value from the cell above?',
        options: ['Ctrl+D', 'Ctrl+R', 'Ctrl+K', 'Ctrl+U'],
        correctAnswer: 'Ctrl+D'
    },
    {
        id: 'ccc_q98',
        question: 'Which of the following is an example of social media?',
        options: ['Facebook', 'MS Word', 'Excel', 'PowerPoint'],
        correctAnswer: 'Facebook'
    },
    {
        id: 'ccc_q99',
        question: 'Which of the following is used to safely remove a USB device?',
        options: ['Eject/ Safely Remove Hardware', 'Delete', 'Format', 'Disable in Device Manager'],
        correctAnswer: 'Eject/ Safely Remove Hardware'
    },
    {
        id: 'ccc_q100',
        question: 'Which of these is the correct definition of software?',
        options: ['Physical parts of computer', 'Programs and applications', 'Electricity used by computer', 'None of the above'],
        correctAnswer: 'Programs and applications'
    },
    {
        id: 'ccc_q101',
        question: 'Which key combination refreshes a webpage in most browsers?',
        options: ['Ctrl+R', 'Ctrl+F5', 'F5', 'All of the above'],
        correctAnswer: 'All of the above'
    },
    {
        id: 'ccc_q102',
        question: 'Which file extension is used for portable document format?',
        options: ['.docx', '.pdf', '.pptx', '.txt'],
        correctAnswer: '.pdf'
    },
    {
        id: 'ccc_q103',
        question: 'Which menu in Word is used to insert page numbers?',
        options: ['Insert', 'Layout', 'References', 'View'],
        correctAnswer: 'Insert'
    },
    {
        id: 'ccc_q104',
        question: 'Which Excel function is used to count cells that meet a condition?',
        options: ['=COUNT()', '=COUNTA()', '=COUNTIF()', '=SUMIF()'],
        correctAnswer: '=COUNTIF()'
    },
    {
        id: 'ccc_q105',
        question: 'Which device connects multiple computers in a LAN?',
        options: ['Router', 'Modem', 'Switch', 'Printer'],
        correctAnswer: 'Switch'
    },
    {
        id: 'ccc_q106',
        question: 'Which shortcut opens a new document in MS Word?',
        options: ['Ctrl+N', 'Ctrl+O', 'Ctrl+S', 'Ctrl+W'],
        correctAnswer: 'Ctrl+N'
    },
    {
        id: 'ccc_q107',
        question: 'Which of the following is a multimedia file format for audio?',
        options: ['.mp3', '.jpg', '.doc', '.xlsx'],
        correctAnswer: '.mp3'
    },
    {
        id: 'ccc_q108',
        question: 'Which option in Excel is used to freeze top row?',
        options: ['View > Freeze Panes > Freeze Top Row', 'Home > Freeze', 'Insert > Freeze', 'Data > Freeze'],
        correctAnswer: 'View > Freeze Panes > Freeze Top Row'
    },
    {
        id: 'ccc_q109',
        question: 'Which of these is responsible for translating domain names to IP addresses?',
        options: ['DNS', 'DHCP', 'FTP', 'HTTP'],
        correctAnswer: 'DNS'
    },
    {
        id: 'ccc_q110',
        question: 'Which key combination opens the Print dialog in most applications?',
        options: ['Ctrl+P', 'Ctrl+S', 'Ctrl+O', 'Ctrl+I'],
        correctAnswer: 'Ctrl+P'
    },
    {
        id: 'ccc_q111',
        question: 'Which Windows tool is used to uninstall programs?',
        options: ['Control Panel > Programs and Features', 'Task Manager', 'File Explorer', 'Device Manager'],
        options: ['Control Panel > Programs and Features', 'Task Manager', 'File Explorer', 'Device Manager'],
        correctAnswer: 'Control Panel > Programs and Features'
    },
    {
        id: 'ccc_q112',
        question: 'Which PowerPoint feature adds animation to slide objects?',
        options: ['Animations tab', 'Transitions tab', 'Insert tab', 'Review tab'],
        correctAnswer: 'Animations tab'
    },
    {
        id: 'ccc_q113',
        question: 'Which of these is a spreadsheet function to find the minimum value?',
        options: ['=MIN()', '=MAX()', '=AVERAGE()', '=SUM()'],
        correctAnswer: '=MIN()'
    },
    {
        id: 'ccc_q114',
        question: 'Which is NOT a type of software license?',
        options: ['Proprietary', 'Open Source', 'Freeware', 'Hardwareware'],
        correctAnswer: 'Hardwareware'
    },
    {
        id: 'ccc_q115',
        question: 'Which of the following is used to create backups automatically in Windows?',
        options: ['File History', 'Disk Cleanup', 'Defragmenter', 'Task Scheduler'],
        correctAnswer: 'File History'
    },
    {
        id: 'ccc_q116',
        question: 'Which key moves cursor to the end of a document?',
        options: ['Ctrl+End', 'Ctrl+Home', 'End', 'Home'],
        correctAnswer: 'Ctrl+End'
    },
    {
        id: 'ccc_q117',
        question: 'Which web address starts with secure protocol?',
        options: ['http://example.com', 'ftp://example.com', 'https://example.com', 'file://example.com'],
        correctAnswer: 'https://example.com'
    },
    {
        id: 'ccc_q118',
        question: 'Which of the following stores system clock and BIOS settings?',
        options: ['RAM', 'CMOS battery', 'Hard Disk', 'GPU'],
        correctAnswer: 'CMOS battery'
    },
    {
        id: 'ccc_q119',
        question: 'Which Excel feature rearranges data into rows and columns for analysis?',
        options: ['Filter', 'Sort', 'Pivot Table', 'Conditional Formatting'],
        correctAnswer: 'Pivot Table'
    },
    {
        id: 'ccc_q120',
        question: 'Which is a valid way to create a new folder in Windows?',
        options: ['Right-click > New > Folder', 'Ctrl+Shift+N', 'Home > New Folder', 'All of the above'],
        correctAnswer: 'All of the above'
    },
    {
        id: 'ccc_q121',
        question: 'Which protocol is used to transfer files over the internet?',
        options: ['FTP', 'SMTP', 'IMAP', 'HTTP'],
        correctAnswer: 'FTP'
    },
    {
        id: 'ccc_q122',
        question: 'Which key combination is used to switch between open applications?',
        options: ['Alt+Tab', 'Ctrl+Tab', 'Windows+Tab', 'Alt+F4'],
        correctAnswer: 'Alt+Tab'
    },
    {
        id: 'ccc_q123',
        question: 'Which of these is a presentation slide layout option?',
        options: ['Title and Content', 'Blank', 'Two Content', 'All of the above'],
        correctAnswer: 'All of the above'
    },
    {
        id: 'ccc_q124',
        question: 'Which Excel shortcut copies the selected cell(s) to the right?',
        options: ['Ctrl+D', 'Ctrl+R', 'Ctrl+C', 'Ctrl+V'],
        correctAnswer: 'Ctrl+R'
    },
    {
        id: 'ccc_q125',
        question: 'Which of the following is used to protect files with a password in Word?',
        options: ['File > Info > Protect Document', 'Review > Protect', 'Home > Protect', 'Insert > Protect'],
        correctAnswer: 'File > Info > Protect Document'
    },
    {
        id: 'ccc_q126',
        question: 'Which device is needed to connect to the internet via telephone line?',
        options: ['Modem', 'Scanner', 'Printer', 'Projector'],
        correctAnswer: 'Modem'
    },
    {
        id: 'ccc_q127',
        question: 'Which is the default file extension for PowerPoint presentations (newer)?',
        options: ['.ppt', '.pptx', '.pps', '.potx'],
        correctAnswer: '.pptx'
    },
    {
        id: 'ccc_q128',
        question: 'What does HTTP status code 404 mean?',
        options: ['OK', 'Not Found', 'Server Error', 'Unauthorized'],
        correctAnswer: 'Not Found'
    },
    {
        id: 'ccc_q129',
        question: 'Which Excel function returns the current date and time?',
        options: ['=NOW()', '=TODAY()', '=DATE()', '=TIME()'],
        correctAnswer: '=NOW()'
    },
    {
        id: 'ccc_q130',
        question: 'Which of these is an example of input/output combined device?',
        options: ['Monitor', 'Printer', 'Touchscreen', 'CPU'],
        correctAnswer: 'Touchscreen'
    },
    {
        id: 'ccc_q131',
        question: 'Which key is used to enter full-screen mode in many browsers?',
        options: ['F11', 'F12', 'Ctrl+F11', 'Alt+F11'],
        correctAnswer: 'F11'
    },
    {
        id: 'ccc_q132',
        question: 'Which of the following is an example of system software?',
        options: ['Operating System', 'MS Word', 'Adobe Photoshop', 'VLC Player'],
        correctAnswer: 'Operating System'
    },
    {
        id: 'ccc_q133',
        question: 'Which Excel function combines text from multiple cells (newer)?',
        options: ['=TEXTJOIN()', '=CONCAT()', '=CONCATENATE()', 'All of the above'],
        correctAnswer: 'All of the above'
    },
    {
        id: 'ccc_q134',
        question: 'Which option in Word is used to track changes?',
        options: ['Review > Track Changes', 'View > Track Changes', 'Insert > Track Changes', 'Home > Track Changes'],
        correctAnswer: 'Review > Track Changes'
    },
    {
        id: 'ccc_q135',
        question: 'Which of these is used to remove duplicate rows in Excel?',
        options: ['Data > Remove Duplicates', 'Home > Remove', 'Insert > Remove', 'Review > Remove Duplicates'],
        correctAnswer: 'Data > Remove Duplicates'
    },
    {
        id: 'ccc_q136',
        question: 'Which storage type is fastest for random access?',
        options: ['HDD', 'SSD', 'DVD', 'Blu-ray'],
        correctAnswer: 'SSD'
    },
    {
        id: 'ccc_q137',
        question: 'Which key combination locks a Windows computer quickly?',
        options: ['Windows+L', 'Ctrl+L', 'Alt+L', 'Windows+K'],
        correctAnswer: 'Windows+L'
    },
    {
        id: 'ccc_q138',
        question: 'Which of the following is used to create a mail merge in Word?',
        options: ['Mailings tab', 'Insert tab', 'Review tab', 'References tab'],
        correctAnswer: 'Mailings tab'
    },
    {
        id: 'ccc_q139',
        question: 'Which term describes software that spies on user activity?',
        options: ['Adware', 'Spyware', 'Worm', 'Ransomware'],
        correctAnswer: 'Spyware'
    },
    {
        id: 'ccc_q140',
        question: 'Which of these tools is used to create diagrams and flowcharts?',
        options: ['MS Visio', 'MS Word', 'MS Excel', 'MS Paint'],
        correctAnswer: 'MS Visio'
    },
    {
        id: 'ccc_q141',
        question: 'Which Excel feature allows scenario analysis?',
        options: ['What-If Analysis', 'Pivot Table', 'Conditional Formatting', 'Data Validation'],
        correctAnswer: 'What-If Analysis'
    },
    {
        id: 'ccc_q142',
        question: 'Which of the following is used to permanently delete files bypassing Recycle Bin?',
        options: ['Shift+Delete', 'Delete', 'Ctrl+Delete', 'Alt+Delete'],
        correctAnswer: 'Shift+Delete'
    },
    {
        id: 'ccc_q143',
        question: 'Which component renders images on the screen?',
        options: ['GPU', 'CPU', 'RAM', 'HDD'],
        correctAnswer: 'GPU'
    },
    {
        id: 'ccc_q144',
        question: 'Which of these is best for sending large files over the internet?',
        options: ['Email attachment', 'Cloud storage link', 'SMS', 'Instant messaging small file'],
        correctAnswer: 'Cloud storage link'
    },
    {
        id: 'ccc_q145',
        question: 'Which of the following is used to change page margins in Word?',
        options: ['Layout > Margins', 'Insert > Margins', 'View > Margins', 'Home > Margins'],
        correctAnswer: 'Layout > Margins'
    },
    {
        id: 'ccc_q146',
        question: 'Which key combination in Excel repeats the last action?',
        options: ['Ctrl+Y', 'Ctrl+Z', 'F4', 'Both A and C'],
        correctAnswer: 'Both A and C'
    },
    {
        id: 'ccc_q147',
        question: 'Which of these is an example of cloud-based email?',
        options: ['Gmail', 'Outlook (desktop only)', 'Thunderbird (desktop)', 'None'],
        correctAnswer: 'Gmail'
    },
    {
        id: 'ccc_q148',
        question: 'Which utility checks and repairs file system errors in Windows?',
        options: ['chkdsk', 'sfc', 'defrag', 'cleanmgr'],
        correctAnswer: 'chkdsk'
    },
    {
        id: 'ccc_q149',
        question: 'Which key is used to open the developer tools in many browsers?',
        options: ['F12', 'F11', 'Ctrl+Shift+I', 'Both A and C'],
        correctAnswer: 'Both A and C'
    },
    {
        id: 'ccc_q150',
        question: 'Which of the following is used to protect wireless networks?',
        options: ['WEP', 'WPA/WPA2/WPA3', 'Open network', 'None'],
        correctAnswer: 'WPA/WPA2/WPA3'
    },
    {
        id: 'ccc_q151',
        question: 'Which Excel function returns the position of a substring within text?',
        options: ['=SEARCH()', '=FIND()', 'Both A and B', '=LOCATE()'],
        correctAnswer: 'Both A and B'
    },
    {
        id: 'ccc_q152',
        question: 'Which of these is NOT a web browser?',
        options: ['Chrome', 'Firefox', 'Edge', 'Excel'],
        correctAnswer: 'Excel'
    },
    {
        id: 'ccc_q153',
        question: 'Which key combination minimizes all windows?',
        options: ['Windows+M', 'Windows+D', 'Alt+M', 'Ctrl+M'],
        correctAnswer: 'Windows+M'
    },
    {
        id: 'ccc_q154',
        question: 'Which of the following formats is best for high-quality images with transparency?',
        options: ['JPEG', 'GIF', 'PNG', 'BMP'],
        correctAnswer: 'PNG'
    },
    {
        id: 'ccc_q155',
        question: 'Which of these is used to compare two documents in Word?',
        options: ['Review > Compare', 'View > Compare', 'Insert > Compare', 'References > Compare'],
        correctAnswer: 'Review > Compare'
    },
    {
        id: 'ccc_q156',
        question: 'Which of the following stores temporary internet files?',
        options: ['Browser cache', 'Recycle Bin', 'Downloads folder', 'Temp folder unrelated to browser'],
        correctAnswer: 'Browser cache'
    },
    {
        id: 'ccc_q157',
        question: 'Which Excel feature creates visual summaries of data using tiles?',
        options: ['Charts', 'Sparklines', 'Conditional Formatting', 'Data Bars'],
        correctAnswer: 'Sparklines'
    },
    {
        id: 'ccc_q158',
        question: 'Which of the following is used to boot an operating system from removable media?',
        options: ['BIOS/UEFI Boot Menu', 'Task Manager', 'Control Panel', 'Disk Cleanup'],
        correctAnswer: 'BIOS/UEFI Boot Menu'
    },
    {
        id: 'ccc_q159',
        question: 'Which protocol secures email transmission between servers?',
        options: ['SMTP with TLS/SSL', 'HTTP', 'FTP', 'SNMP'],
        correctAnswer: 'SMTP with TLS/SSL'
    },
    {
        id: 'ccc_q160',
        question: 'Which Word feature inserts citations and bibliography?',
        options: ['References tab', 'Insert tab', 'Review tab', 'Mailings tab'],
        correctAnswer: 'References tab'
    },
    {
        id: 'ccc_q161',
        question: 'Which of these is used to restore a system to an earlier state?',
        options: ['System Restore', 'Disk Cleanup', 'Defragmenter', 'Event Viewer'],
        correctAnswer: 'System Restore'
    },
    {
        id: 'ccc_q162',
        question: 'Which Excel formula rounds a number to the nearest integer?',
        options: ['=ROUND()', '=INT()', '=TRUNC()', 'All can but behave differently'],
        correctAnswer: 'All can but behave differently'
    },
    {
        id: 'ccc_q163',
        question: 'Which of the following indicates a secure website in browser address bar?',
        options: ['Padlock icon', 'Green text', 'No icon', 'Red warning icon'],
        correctAnswer: 'Padlock icon'
    },
    {
        id: 'ccc_q164',
        question: 'Which is a primary function of spreadsheet software?',
        options: ['Data calculation', 'Text editing only', 'Image editing', 'Video playback'],
        correctAnswer: 'Data calculation'
    },
    {
        id: 'ccc_q165',
        question: 'Which key combination in Word applies bold formatting?',
        options: ['Ctrl+B', 'Ctrl+I', 'Ctrl+U', 'Ctrl+L'],
        correctAnswer: 'Ctrl+B'
    },
    {
        id: 'ccc_q166',
        question: 'Which of these is used to manage user accounts in Windows?',
        options: ['Control Panel > User Accounts', 'Task Manager', 'File Explorer', 'Device Manager'],
        correctAnswer: 'Control Panel > User Accounts'
    },
    {
        id: 'ccc_q167',
        question: 'Which PowerPoint option adds speaker notes?',
        options: ['Notes pane', 'Animations', 'Transitions', 'Slide Sorter'],
        correctAnswer: 'Notes pane'
    },
    {
        id: 'ccc_q168',
        question: 'Which of these is a measure of internet speed?',
        options: ['Mbps', 'MHz', 'GB', 'GBps'],
        correctAnswer: 'Mbps'
    },
    {
        id: 'ccc_q169',
        question: 'Which Windows feature shows recent activity and notifications?',
        options: ['Action Center / Notification Center', 'Taskbar', 'Start Menu', 'Control Panel'],
        correctAnswer: 'Action Center / Notification Center'
    },
    {
        id: 'ccc_q170',
        question: 'Which function in Excel removes leading and trailing spaces?',
        options: ['=TRIM()', '=CLEAN()', '=SUBSTITUTE()', '=REMOVE()'],
        correctAnswer: '=TRIM()'
    },
    {
        id: 'ccc_q171',
        question: 'Which of the following is a two-factor authentication example?',
        options: ['Password + SMS code', 'Password only', 'Biometric only', 'None of the above'],
        correctAnswer: 'Password + SMS code'
    },
    {
        id: 'ccc_q172',
        question: 'Which tool helps create and edit PDF files?',
        options: ['Adobe Acrobat', 'Notepad', 'Paint', 'Calculator'],
        correctAnswer: 'Adobe Acrobat'
    },
    {
        id: 'ccc_q173',
        question: 'Which command line utility lists files and folders on Windows?',
        options: ['dir', 'ls', 'pwd', 'cd'],
        correctAnswer: 'dir'
    },
    {
        id: 'ccc_q174',
        question: 'Which of the following is a commonly used video format?',
        options: ['.mp4', '.docx', '.xlsx', '.pptx'],
        correctAnswer: '.mp4'
    },
    {
        id: 'ccc_q175',
        question: 'Which Excel function checks if a condition is true or false?',
        options: ['=IF()', '=SUMIF()', '=COUNTIF()', '=AVERAGEIF()'],
        correctAnswer: '=IF()'
    },
    {
        id: 'ccc_q176',
        question: 'Which of the following is used to create formulas in Word tables?',
        options: ['Layout > Formula', 'Insert > Formula', 'References > Formula', 'Home > Formula'],
        correctAnswer: 'Layout > Formula'
    },
    {
        id: 'ccc_q177',
        question: 'Which key opens the context menu for a selected item?',
        options: ['Right-click or Shift+F10', 'F10', 'Alt+Enter', 'Ctrl+Shift+M'],
        correctAnswer: 'Right-click or Shift+F10'
    },
    {
        id: 'ccc_q178',
        question: 'Which of these is a commonly used image editing software?',
        options: ['Adobe Photoshop', 'MS Excel', 'Notepad', 'Task Manager'],
        correctAnswer: 'Adobe Photoshop'
    },
    {
        id: 'ccc_q179',
        question: 'Which Windows utility shows running processes and performance?',
        options: ['Task Manager', 'Event Viewer', 'Device Manager', 'Control Panel'],
        correctAnswer: 'Task Manager'
    },
    {
        id: 'ccc_q180',
        question: 'Which protocol is commonly used for secure file transfer?',
        options: ['SFTP', 'HTTP', 'SMTP', 'POP3'],
        correctAnswer: 'SFTP'
    },
    {
        id: 'ccc_q181',
        question: 'Which Excel feature highlights duplicate values?',
        options: ['Conditional Formatting', 'Data Validation', 'Filter', 'Sort'],
        correctAnswer: 'Conditional Formatting'
    },
    {
        id: 'ccc_q182',
        question: 'Which browser feature blocks pop-up windows?',
        options: ['Pop-up Blocker', 'Incognito Mode', 'Bookmarks', 'History'],
        correctAnswer: 'Pop-up Blocker'
    },
    {
        id: 'ccc_q183',
        question: 'Which of the following is a non-printable character visible in Word when toggled?',
        options: ['Paragraph mark (¶)', 'Page number', 'Header', 'Footer'],
        correctAnswer: 'Paragraph mark (¶)'
    },
    {
        id: 'ccc_q184',
        question: 'Which of these is used to partition and format a new hard disk?',
        options: ['Disk Management', 'Device Manager', 'Task Manager', 'Event Viewer'],
        correctAnswer: 'Disk Management'
    },
    {
        id: 'ccc_q185',
        question: 'Which Excel function returns TRUE if any argument is TRUE?',
        options: ['=AND()', '=OR()', '=NOT()', '=IF()'],
        correctAnswer: '=OR()'
    },
    {
        id: 'ccc_q186',
        question: 'Which key combination in PowerPoint starts slideshow from first slide?',
        options: ['F5', 'Shift+F5', 'Ctrl+F5', 'Alt+F5'],
        correctAnswer: 'F5'
    },
    {
        id: 'ccc_q187',
        question: 'Which of these is used to make a file read-only?',
        options: ['File properties > Read-only', 'Delete file', 'Rename file', 'Compress file'],
        correctAnswer: 'File properties > Read-only'
    },
    {
        id: 'ccc_q188',
        question: 'Which of the following expands a compressed (.zip) file?',
        options: ['Extract', 'Compress', 'Format', 'Encrypt'],
        correctAnswer: 'Extract'
    },
    {
        id: 'ccc_q189',
        question: 'Which Excel tool finds and replaces values?',
        options: ['Ctrl+H', 'Ctrl+F', 'Ctrl+R', 'Ctrl+S'],
        correctAnswer: 'Ctrl+H'
    },
    {
        id: 'ccc_q190',
        question: 'Which is a common action to protect privacy on public Wi-Fi?',
        options: ['Use VPN', 'Use open DNS', 'Disable browser', 'Use older browser'],
        correctAnswer: 'Use VPN'
    },
    {
        id: 'ccc_q191',
        question: 'Which MS Word view shows the document as a simple continuous draft?',
        options: ['Draft view', 'Print Layout', 'Web Layout', 'Outline'],
        correctAnswer: 'Draft view'
    },
    {
        id: 'ccc_q192',
        question: 'Which of these is a root-level folder in Windows file system?',
        options: ['C:\\', 'Documents', 'Pictures', 'Downloads'],
        correctAnswer: 'C:\\'
    },
    {
        id: 'ccc_q193',
        question: 'Which Excel shortcut selects the entire current column?',
        options: ['Ctrl+Space', 'Shift+Space', 'Ctrl+Shift+Space', 'Alt+Space'],
        correctAnswer: 'Ctrl+Space'
    },
    {
        id: 'ccc_q194',
        question: 'Which of the following is a device driver?',
        options: ['Software that controls hardware', 'An application', 'A file format', 'A printer'],
        correctAnswer: 'Software that controls hardware'
    },
    {
        id: 'ccc_q195',
        question: 'Which option in Word creates a watermark?',
        options: ['Design > Watermark', 'Insert > Watermark', 'Layout > Watermark', 'References > Watermark'],
        correctAnswer: 'Design > Watermark'
    },
    {
        id: 'ccc_q196',
        question: 'Which of these is used to remove temporary files in Windows?',
        options: ['Disk Cleanup', 'Defragmenter', 'Backup', 'Restore'],
        correctAnswer: 'Disk Cleanup'
    },
    {
        id: 'ccc_q197',
        question: 'Which Excel function returns the square root of a number?',
        options: ['=SQRT()', '=POWER()', '=ROOT()', '=SQR()'],
        correctAnswer: '=SQRT()'
    },
    {
        id: 'ccc_q198',
        question: 'Which of the following is used to block unwanted email?',
        options: ['Spam filter', 'Firewall', 'Defragmenter', 'Task Scheduler'],
        correctAnswer: 'Spam filter'
    },
    {
        id: 'ccc_q199',
        question: 'Which of these is an advantage of using cloud storage?',
        options: ['Access from anywhere', 'Risk of local drive failure', 'Slower access always', 'Requires physical shipment'],
        correctAnswer: 'Access from anywhere'
    },
    {
        id: 'ccc_q200',
        question: 'Which of the following best describes "browser cache"?',
        options: ['Temporary storage of web resources to speed up browsing', 'Permanent backup of websites', 'Encryption of web pages', 'A security feature only'],
        correctAnswer: 'Temporary storage of web resources to speed up browsing'
    }
,
    {
        id: 'ccc_q201',
        question: 'Which key combination opens the Task Manager directly?',
        options: ['Ctrl+Alt+Del', 'Ctrl+Shift+Esc', 'Alt+F4', 'Windows+X'],
        correctAnswer: 'Ctrl+Shift+Esc'
    },
    {
        id: 'ccc_q202',
        question: 'Which Windows feature allows creating a virtual desktop?',
        options: ['Task View', 'Task Manager', 'Action Center', 'File Explorer'],
        correctAnswer: 'Task View'
    },
    {
        id: 'ccc_q203',
        question: 'Which file system is commonly used by Windows?',
        options: ['NTFS', 'EXT4', 'HFS+', 'FAT16'],
        correctAnswer: 'NTFS'
    },
    {
        id: 'ccc_q204',
        question: 'Which Excel function returns the current date only?',
        options: ['=NOW()', '=TODAY()', '=DATE()', '=TIME()'],
        correctAnswer: '=TODAY()'
    },
    {
        id: 'ccc_q205',
        question: 'Which of these is used to secure a wireless network from unauthorized access?',
        options: ['Change default SSID and strong password', 'Leave it open', 'Disable firewall', 'Use WEP'],
        correctAnswer: 'Change default SSID and strong password'
    },
    {
        id: 'ccc_q206',
        question: 'Which of the following is used to schedule a meeting online?',
        options: ['Calendar app / Online meeting tools', 'Notepad', 'Paint', 'Calculator'],
        correctAnswer: 'Calendar app / Online meeting tools'
    },
    {
        id: 'ccc_q207',
        question: 'Which protocol is used to securely browse websites?',
        options: ['HTTPS', 'FTP', 'SMTP', 'IMAP'],
        correctAnswer: 'HTTPS'
    },
    {
        id: 'ccc_q208',
        question: 'Which Excel shortcut opens the Format Cells dialog?',
        options: ['Ctrl+1', 'Ctrl+2', 'Ctrl+3', 'Ctrl+4'],
        correctAnswer: 'Ctrl+1'
    },
    {
        id: 'ccc_q209',
        question: 'Which of these is a presentation transition effect?',
        options: ['Fade', 'Zoom', 'Wipe', 'All of the above'],
        correctAnswer: 'All of the above'
    },
    {
        id: 'ccc_q210',
        question: 'Which of the following is used to encrypt files on Windows?',
        options: ['BitLocker / Encrypting File System', 'Disk Cleanup', 'Defragmenter', 'Task Scheduler'],
        correctAnswer: 'BitLocker / Encrypting File System'
    },
    {
        id: 'ccc_q211',
        question: 'Which HTML element defines a table row?',
        options: ['<tr>', '<td>', '<th>', '<table>'],
        correctAnswer: '<tr>'
    },
    {
        id: 'ccc_q212',
        question: 'Which Excel function returns the current time only?',
        options: ['=NOW()', '=TIME()', '=TODAY()', '=CURRENT()'],
        correctAnswer: '=TIME()'
    },
    {
        id: 'ccc_q213',
        question: 'Which of these is used to remove malware from a PC?',
        options: ['Anti-malware / Antivirus software', 'Task Scheduler', 'Disk Management', 'Device Manager'],
        correctAnswer: 'Anti-malware / Antivirus software'
    },
    {
        id: 'ccc_q214',
        question: 'Which PowerPoint feature allows rehearsing timings?',
        options: ['Rehearse Timings', 'Slide Sorter', 'Notes Page', 'Transitions'],
        correctAnswer: 'Rehearse Timings'
    },
    {
        id: 'ccc_q215',
        question: 'Which Excel tool helps to find correlation and regression?',
        options: ['Data Analysis (Analysis ToolPak)', 'Conditional Formatting', 'Sort', 'Freeze Panes'],
        correctAnswer: 'Data Analysis (Analysis ToolPak)'
    },
    {
        id: 'ccc_q216',
        question: 'Which of the following is a valid MAC address format?',
        options: ['00-1A-2B-3C-4D-5E', '192.168.0.1', '255.255.255.0', 'example.com'],
        correctAnswer: '00-1A-2B-3C-4D-5E'
    },
    {
        id: 'ccc_q217',
        question: 'Which Windows feature allows creating a system image backup?',
        options: ['Backup and Restore (Windows)', 'Disk Cleanup', 'Defragment', 'Task Manager'],
        correctAnswer: 'Backup and Restore (Windows)'
    },
    {
        id: 'ccc_q218',
        question: 'Which key combination copies selected cells in Excel?',
        options: ['Ctrl+C', 'Ctrl+X', 'Ctrl+V', 'Ctrl+Z'],
        correctAnswer: 'Ctrl+C'
    },
    {
        id: 'ccc_q219',
        question: 'Which of the following is an example of cloud collaboration tool?',
        options: ['Google Workspace / Microsoft 365', 'Notepad', 'Calculator', 'Paint'],
        correctAnswer: 'Google Workspace / Microsoft 365'
    },
    {
        id: 'ccc_q220',
        question: 'Which of these represents a safe password practice?',
        options: ['Use a passphrase + enable 2FA', 'Use "password" for convenience', 'Share password via email', 'Reuse same password everywhere'],
        correctAnswer: 'Use a passphrase + enable 2FA'
    },
    {
        id: 'ccc_q221',
        question: 'Which function in Excel returns the remainder after division?',
        options: ['=MOD()', '=ROUND()', '=INT()', '=DIV()'],
        correctAnswer: '=MOD()'
    },
    {
        id: 'ccc_q222',
        question: 'Which of the following is used to check system file integrity in Windows?',
        options: ['sfc /scannow', 'chkdsk', 'defrag', 'cleanmgr'],
        correctAnswer: 'sfc /scannow'
    },
    {
        id: 'ccc_q223',
        question: 'Which protocol is used to receive email and keep it on the server?',
        options: ['IMAP', 'POP3', 'SMTP', 'FTP'],
        correctAnswer: 'IMAP'
    },
    {
        id: 'ccc_q224',
        question: 'Which PowerPoint view shows one slide at a time with notes?',
        options: ['Notes Page', 'Slide Sorter', 'Normal', 'Reading View'],
        correctAnswer: 'Notes Page'
    },
    {
        id: 'ccc_q225',
        question: 'Which key in Word moves the cursor to next paragraph quickly?',
        options: ['Ctrl+Down Arrow', 'Ctrl+Up Arrow', 'Ctrl+Left Arrow', 'Ctrl+Right Arrow'],
        correctAnswer: 'Ctrl+Down Arrow'
    },
    {
        id: 'ccc_q226',
        question: 'Which of the following is NOT a spreadsheet data type?',
        options: ['Audio clip', 'Number', 'Text', 'Date'],
        correctAnswer: 'Audio clip'
    },
    {
        id: 'ccc_q227',
        question: 'Which command lists hidden files on Linux (example)?',
        options: ['ls -a', 'dir /a', 'show hidden', 'ls -h'],
        correctAnswer: 'ls -a'
    },
    {
        id: 'ccc_q228',
        question: 'Which of these is a vector graphics format?',
        options: ['SVG', 'JPEG', 'PNG', 'BMP'],
        correctAnswer: 'SVG'
    },
    {
        id: 'ccc_q229',
        question: 'Which Excel chart is best to show comparison between categories?',
        options: ['Column chart', 'Pie chart', 'Scatter plot', 'Radar chart'],
        correctAnswer: 'Column chart'
    },
    {
        id: 'ccc_q230',
        question: 'Which of the following is an advantage of SSD over HDD?',
        options: ['Faster access speed', 'Higher noise', 'Higher mechanical failure', 'Lower cost per GB'],
        correctAnswer: 'Faster access speed'
    },
    {
        id: 'ccc_q231',
        question: 'Which Windows tool displays event logs?',
        options: ['Event Viewer', 'Task Manager', 'Device Manager', 'File Explorer'],
        correctAnswer: 'Event Viewer'
    },
    {
        id: 'ccc_q232',
        question: 'Which Excel function converts text to uppercase?',
        options: ['=UPPER()', '=LOWER()', '=PROPER()', '=TEXT()'],
        correctAnswer: '=UPPER()'
    },
    {
        id: 'ccc_q233',
        question: 'Which of the following is used to create hyperlinks in Excel?',
        options: ['Insert > Link', 'Data > Link', 'View > Link', 'Home > Link'],
        correctAnswer: 'Insert > Link'
    },
    {
        id: 'ccc_q234',
        question: 'Which term refers to unsolicited bulk email?',
        options: ['Spam', 'Phishing', 'Malware', 'Adware'],
        correctAnswer: 'Spam'
    },
    {
        id: 'ccc_q235',
        question: 'Which PowerPoint tab is used to add speaker notes?',
        options: ['View (Notes pane) / Normal view', 'Animations', 'Transitions', 'Design'],
        correctAnswer: 'View (Notes pane) / Normal view'
    },
    {
        id: 'ccc_q236',
        question: 'Which HTML attribute specifies alternate text for an image?',
        options: ['alt', 'title', 'src', 'href'],
        correctAnswer: 'alt'
    },
    {
        id: 'ccc_q237',
        question: 'Which Excel function counts non-empty cells?',
        options: ['=COUNTA()', '=COUNT()', '=COUNTBLANK()', '=SUM()'],
        correctAnswer: '=COUNTA()'
    },
    {
        id: 'ccc_q238',
        question: 'Which keyboard shortcut in Word centers the selected text?',
        options: ['Ctrl+E', 'Ctrl+L', 'Ctrl+R', 'Ctrl+J'],
        correctAnswer: 'Ctrl+E'
    },
    {
        id: 'ccc_q239',
        question: 'Which of these is used to access BIOS/UEFI settings at startup?',
        options: ['Press Del/F2/F10 during boot', 'Ctrl+Alt+Del after login', 'Open Task Manager', 'Use File Explorer'],
        correctAnswer: 'Press Del/F2/F10 during boot'
    },
    {
        id: 'ccc_q240',
        question: 'Which network device is used to assign IP addresses automatically?',
        options: ['DHCP server', 'Printer', 'Switch', 'UPS'],
        correctAnswer: 'DHCP server'
    },
    {
        id: 'ccc_q241',
        question: 'Which Excel feature allows locking rows/columns while scrolling?',
        options: ['Freeze Panes', 'Split', 'Protect Sheet', 'Hide Rows'],
        correctAnswer: 'Freeze Panes'
    },
    {
        id: 'ccc_q242',
        question: 'Which of the following is used to convert a Word document to PDF?',
        options: ['File > Save As > PDF', 'Copy-paste', 'Print screen', 'Insert > PDF'],
        correctAnswer: 'File > Save As > PDF'
    },
    {
        id: 'ccc_q243',
        question: 'Which password policy improves account security?',
        options: ['Minimum length + complexity + periodic change', 'Use simple words', 'Use same password for all accounts', 'Share passwords via chat'],
        correctAnswer: 'Minimum length + complexity + periodic change'
    },
    {
        id: 'ccc_q244',
        question: 'Which of these is a common video conferencing tool?',
        options: ['Zoom', 'Notepad', 'Calculator', 'Paint'],
        correctAnswer: 'Zoom'
    },
    {
        id: 'ccc_q245',
        question: 'Which of the following helps protect against data loss from power failure?',
        options: ['UPS (Uninterruptible Power Supply)', 'Firewall', 'Antivirus', 'Printer'],
        correctAnswer: 'UPS (Uninterruptible Power Supply)'
    },
    {
        id: 'ccc_q246',
        question: 'Which Excel function returns the largest nth value (e.g., 2nd largest)?',
        options: ['=LARGE(range, n)', '=SMALL(range, n)', '=MAX()', '=RANK()'],
        correctAnswer: '=LARGE(range, n)'
    },
    {
        id: 'ccc_q247',
        question: 'Which of the following is NOT a programming language?',
        options: ['HTML', 'Python', 'Java', 'C++'],
        correctAnswer: 'HTML'
    },
    {
        id: 'ccc_q248',
        question: 'Which Windows feature shows storage usage per drive?',
        options: ['Storage settings / This PC', 'Disk Management', 'Task Manager', 'Event Viewer'],
        correctAnswer: 'Storage settings / This PC'
    },
    {
        id: 'ccc_q249',
        question: 'Which Excel shortcut moves to the last used cell in a row/column?',
        options: ['Ctrl+Arrow key', 'Alt+Arrow key', 'Shift+Arrow key', 'Ctrl+Shift+Arrow'],
        correctAnswer: 'Ctrl+Arrow key'
    },
    {
        id: 'ccc_q250',
        question: 'Which of these is an example of open-source office suite?',
        options: ['LibreOffice', 'MS Office', 'Apple iWork', 'Corel WordPerfect'],
        correctAnswer: 'LibreOffice'
    },
    {
        id: 'ccc_q251',
        question: 'Which command on Windows shows current IP configuration?',
        options: ['ipconfig', 'ifconfig', 'ping', 'tracert'],
        correctAnswer: 'ipconfig'
    },
    {
        id: 'ccc_q252',
        question: 'Which Excel function returns the number of characters in a text string?',
        options: ['=LEN()', '=LENGTH()', '=COUNT()', '=CHAR()'],
        correctAnswer: '=LEN()'
    },
    {
        id: 'ccc_q253',
        question: 'Which of the following best describes "two-factor authentication"?',
        options: ['Something you know + something you have', 'Password only', 'Biometrics only', 'Something you are only'],
        correctAnswer: 'Something you know + something you have'
    },
    {
        id: 'ccc_q254',
        question: 'Which file extension represents a compressed archive?',
        options: ['.zip', '.docx', '.xlsx', '.pptx'],
        correctAnswer: '.zip'
    },
    {
        id: 'ccc_q255',
        question: 'Which PowerPoint tab contains options for slide background?',
        options: ['Design', 'Insert', 'Animations', 'Transition'],
        correctAnswer: 'Design'
    },
    {
        id: 'ccc_q256',
        question: 'Which of these is used to check internet connectivity?',
        options: ['ping', 'ipconfig', 'netstat', 'route'],
        correctAnswer: 'ping'
    },
    {
        id: 'ccc_q257',
        question: 'Which Excel feature is used to remove extra spaces inside text?',
        options: ['=TRIM()', '=CLEAN()', '=SUBSTITUTE()', '=REMOVE()'],
        correctAnswer: '=TRIM()'
    },
    {
        id: 'ccc_q258',
        question: 'Which of the following is a secure way to share large files?',
        options: ['Share a cloud link with access control', 'Attach to public forum', 'Send via unsecured HTTP', 'Post on social media'],
        correctAnswer: 'Share a cloud link with access control'
    },
    {
        id: 'ccc_q259',
        question: 'Which of these file extensions is executable on Windows?',
        options: ['.exe', '.txt', '.jpg', '.pdf'],
        correctAnswer: '.exe'
    },
    {
        id: 'ccc_q260',
        question: 'Which Windows feature lets you mount ISO files as virtual drives?',
        options: ['Mount via File Explorer (right-click > Mount)', 'Disk Cleanup', 'Defragmenter', 'Device Manager'],
        correctAnswer: 'Mount via File Explorer (right-click > Mount)'
    },
    {
        id: 'ccc_q261',
        question: 'Which Excel function returns TRUE when all arguments are TRUE?',
        options: ['=AND()', '=OR()', '=NOT()', '=IF()'],
        correctAnswer: '=AND()'
    },
    {
        id: 'ccc_q262',
        question: 'Which tool helps detect network path and hops to a server?',
        options: ['tracert / traceroute', 'ping', 'ipconfig', 'nslookup'],
        correctAnswer: 'tracert / traceroute'
    },
    {
        id: 'ccc_q263',
        question: 'Which of the following file formats preserves layout for printing across platforms?',
        options: ['PDF', 'DOCX', 'PPTX', 'XLSX'],
        correctAnswer: 'PDF'
    },
    {
        id: 'ccc_q264',
        question: 'Which Excel feature allows conditional calculations across scenarios?',
        options: ['What-If Analysis', 'Conditional Formatting', 'Data Validation', 'Filter'],
        correctAnswer: 'What-If Analysis'
    },
    {
        id: 'ccc_q265',
        question: 'Which of these is a popular content management system (CMS)?',
        options: ['WordPress', 'Excel', 'PowerPoint', 'Notepad'],
        correctAnswer: 'WordPress'
    },
    {
        id: 'ccc_q266',
        question: 'Which Windows utility shows connected devices and drivers?',
        options: ['Device Manager', 'Task Manager', 'Event Viewer', 'Disk Management'],
        correctAnswer: 'Device Manager'
    },
    {
        id: 'ccc_q267',
        question: 'Which Excel function extracts a substring from the middle of text?',
        options: ['=MID()', '=LEFT()', '=RIGHT()', '=SUBSTR()'],
        correctAnswer: '=MID()'
    },
    {
        id: 'ccc_q268',
        question: 'Which of the following is best to remove dust from keyboard safely?',
        options: ['Compressed air spray', 'Water', 'Wet cloth', 'Oven'],
        correctAnswer: 'Compressed air spray'
    },
    {
        id: 'ccc_q269',
        question: 'Which of these is used to convert text into columns in Excel?',
        options: ['Text to Columns (Data tab)', 'Flash Fill', 'Remove Duplicates', 'Filter'],
        correctAnswer: 'Text to Columns (Data tab)'
    },
    {
        id: 'ccc_q270',
        question: 'Which of the following is a web-based spreadsheet tool?',
        options: ['Google Sheets', 'MS Word', 'Notepad', 'Paint'],
        correctAnswer: 'Google Sheets'
    },
    {
        id: 'ccc_q271',
        question: 'Which command-line tool checks open network ports?',
        options: ['netstat', 'ipconfig', 'ping', 'tracert'],
        correctAnswer: 'netstat'
    },
    {
        id: 'ccc_q272',
        question: 'Which Word feature helps to compare revisions from two documents?',
        options: ['Review > Compare', 'View > Compare', 'Insert > Compare', 'References > Compare'],
        correctAnswer: 'Review > Compare'
    },
    {
        id: 'ccc_q273',
        question: 'Which Excel function returns the position of a character from the right?',
        options: ['=FIND() combined with LEN()', '=RIGHT()', '=SEARCH()', '=LOCATE()'],
        correctAnswer: '=FIND() combined with LEN()'
    },
    {
        id: 'ccc_q274',
        question: 'Which of the following is used to accelerate system performance by caching frequently used data?',
        options: ['RAM cache / SSD', 'Disk Cleanup', 'Defragment', 'Event Viewer'],
        correctAnswer: 'RAM cache / SSD'
    },
    {
        id: 'ccc_q275',
        question: 'Which of these is a common way to phishing attackers trick users?',
        options: ['Fake login page via email link', 'Physical mail only', 'Printer jam', 'Sound alerts'],
        correctAnswer: 'Fake login page via email link'
    },
    {
        id: 'ccc_q276',
        question: 'Which Excel feature hides formulas but shows values?',
        options: ['Protect Sheet (hide formulas)', 'Hide Rows', 'Hide Columns', 'Filter'],
        correctAnswer: 'Protect Sheet (hide formulas)'
    },
    {
        id: 'ccc_q277',
        question: 'Which of these keyboard shortcuts closes the active tab in a browser?',
        options: ['Ctrl+W', 'Ctrl+T', 'Ctrl+N', 'Ctrl+Shift+T'],
        correctAnswer: 'Ctrl+W'
    },
    {
        id: 'ccc_q278',
        question: 'Which of the following is used to remotely connect to another Windows machine (built-in)?',
        options: ['Remote Desktop (RDP)', 'FTP', 'HTTP', 'SMTP'],
        correctAnswer: 'Remote Desktop (RDP)'
    },
    {
        id: 'ccc_q279',
        question: 'Which of these is the default shell on most Linux distributions?',
        options: ['bash', 'cmd.exe', 'PowerShell', 'zsh (varies)'],
        correctAnswer: 'bash'
    },
    {
        id: 'ccc_q280',
        question: 'Which Excel feature groups data into categories for subtotaling?',
        options: ['Subtotal (Data > Subtotal)', 'Pivot Table', 'Filter', 'Sort'],
        correctAnswer: 'Subtotal (Data > Subtotal)'
    },
    {
        id: 'ccc_q281',
        question: 'Which of the following describes "incognito/private mode" in browsers?',
        options: ['Does not save local browsing history or cookies after session', 'Encrypts internet traffic', 'Blocks all ads', 'Makes you anonymous online'],
        correctAnswer: 'Does not save local browsing history or cookies after session'
    },
    {
        id: 'ccc_q282',
        question: 'Which Windows command opens the Registry Editor?',
        options: ['regedit', 'msconfig', 'services.msc', 'taskmgr'],
        correctAnswer: 'regedit'
    },
    {
        id: 'ccc_q283',
        question: 'Which Excel function returns the logical opposite of a condition?',
        options: ['=NOT()', '=AND()', '=OR()', '=IF()'],
        correctAnswer: '=NOT()'
    },
    {
        id: 'ccc_q284',
        question: 'Which protocol is used to securely transfer files (SSH based)?',
        options: ['SFTP', 'FTP', 'HTTP', 'SMTP'],
        correctAnswer: 'SFTP'
    },
    {
        id: 'ccc_q285',
        question: 'Which file extension is associated with Microsoft Access database?',
        options: ['.accdb', '.docx', '.xlsx', '.pptx'],
        correctAnswer: '.accdb'
    },
    {
        id: 'ccc_q286',
        question: 'Which Excel feature visually shows trends inside a single cell?',
        options: ['Sparklines', 'Charts', 'Conditional Formatting', 'Data Bars'],
        correctAnswer: 'Sparklines'
    },
    {
        id: 'ccc_q287',
        question: 'Which of the following is a good practice before installing new software?',
        options: ['Create a system restore point', 'Turn off antivirus permanently', 'Ignore user reviews', 'Disable updates'],
        correctAnswer: 'Create a system restore point'
    },
    {
        id: 'ccc_q288',
        question: 'Which Windows utility manages disk partitions?',
        options: ['Disk Management', 'Device Manager', 'Task Manager', 'Control Panel'],
        correctAnswer: 'Disk Management'
    },
    {
        id: 'ccc_q289',
        question: 'Which Excel function returns a value from a table based on a lookup value (exact match)?',
        options: ['=VLOOKUP(value, table, col, FALSE) / =XLOOKUP()', '=SUM()', '=IF()', '=COUNT()'],
        correctAnswer: '=VLOOKUP(value, table, col, FALSE) / =XLOOKUP()'
    },
    {
        id: 'ccc_q290',
        question: 'Which of these is a benefit of using templates in Office applications?',
        options: ['Saves time by reusing layouts and styles', 'Slower performance', 'Removes images automatically', 'Prevents printing'],
        correctAnswer: 'Saves time by reusing layouts and styles'
    },
    {
        id: 'ccc_q291',
        question: 'Which of these file sharing methods provides the most control over access?',
        options: ['Cloud link with permission settings', 'Posting on public forum', 'Email attachment to everyone', 'USB handoff'],
        correctAnswer: 'Cloud link with permission settings'
    },
    {
        id: 'ccc_q292',
        question: 'Which Windows feature allows resetting PC to factory settings?',
        options: ['Reset this PC', 'Disk Cleanup', 'Defragment', 'Event Viewer'],
        correctAnswer: 'Reset this PC'
    },
    {
        id: 'ccc_q293',
        question: 'Which Excel function checks whether a cell is blank?',
        options: ['=ISBLANK()', '=ISNUMBER()', '=ISERROR()', '=IF()'],
        correctAnswer: '=ISBLANK()'
    },
    {
        id: 'ccc_q294',
        question: 'Which of the following is used to update device drivers in Windows?',
        options: ['Device Manager > Update driver', 'Task Manager > Update', 'Control Panel > Programs', 'File Explorer > Update'],
        correctAnswer: 'Device Manager > Update driver'
    },
    {
        id: 'ccc_q295',
        question: 'Which of these is a browser extension that blocks ads?',
        options: ['Adblock Plus / uBlock Origin', 'Flash Player', 'Java', 'WinZip'],
        correctAnswer: 'Adblock Plus / uBlock Origin'
    },
    {
        id: 'ccc_q296',
        question: 'Which Excel feature protects workbook structure from changes?',
        options: ['Protect Workbook (password)', 'Protect Sheet', 'Hide Rows', 'Lock Cells'],
        correctAnswer: 'Protect Workbook (password)'
    },
    {
        id: 'ccc_q297',
        question: 'Which of the following is an example of biometric authentication?',
        options: ['Fingerprint scan', 'Password', 'PIN', 'Security question'],
        correctAnswer: 'Fingerprint scan'
    },
    {
        id: 'ccc_q298',
        question: 'Which Windows shortcut opens File Explorer?',
        options: ['Windows+E', 'Windows+F', 'Ctrl+E', 'Alt+E'],
        correctAnswer: 'Windows+E'
    },
    {
        id: 'ccc_q299',
        question: 'Which of the following helps reduce phishing risks?',
        options: ['Verify sender address and avoid clicking suspicious links', 'Open every email attachment', 'Reply with your password', 'Disable antivirus'],
        correctAnswer: 'Verify sender address and avoid clicking suspicious links'
    },
    {
        id: 'ccc_q300',
        question: 'Which of these best describes "bandwidth" in networking?',
        options: ['Maximum data transfer rate of a network connection', 'Amount of storage on disk', 'CPU processing power', 'Number of connected devices'],
        correctAnswer: 'Maximum data transfer rate of a network connection'
    }
]


,"dca":[
    {
        id: 'dca_q1',
        question: 'What does DCA typically stand for in computer education?',
        options: ['Diploma in Computer Applications', 'Data Center Admin', 'Digital Computer Architecture', 'Database and Cloud Analytics'],
        correctAnswer: 'Diploma in Computer Applications'
    },
    {
        id: 'dca_q2',
        question: 'Which language is commonly taught first in DCA for programming basics?',
        options: ['C', 'Python', 'Java', 'COBOL'],
        correctAnswer: 'C'
    },
    {
        id: 'dca_q3',
        question: 'Which of the following is a primary use of an operating system?',
        options: ['Manage hardware resources', 'Edit images', 'Write documents', 'Design websites'],
        correctAnswer: 'Manage hardware resources'
    },
    {
        id: 'dca_q4',
        question: 'Which storage device is volatile?',
        options: ['RAM', 'Hard Disk', 'SSD', 'CD-ROM'],
        correctAnswer: 'RAM'
    },
    {
        id: 'dca_q5',
        question: 'Which of these is NOT a relational database management system (RDBMS)?',
        options: ['MySQL', 'Oracle', 'MongoDB', 'SQL Server'],
        correctAnswer: 'MongoDB'
    },
    {
        id: 'dca_q6',
        question: 'Which SQL command is used to retrieve data from a database?',
        options: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
        correctAnswer: 'SELECT'
    },
    {
        id: 'dca_q7',
        question: 'In C programming, which symbol ends a statement?',
        options: [';', ':', '.', ','],
        correctAnswer: ';'
    },
    {
        id: 'dca_q8',
        question: 'Which tag is used for the main heading in HTML?',
        options: ['&lt;h1&gt;', '&lt;head&gt;', '&lt;title&gt;', '&lt;header&gt;'],
        correctAnswer: '<h1>'
    },
    {
        id: 'dca_q9',
        question: 'Which CSS property changes the text color?',
        options: ['color', 'font-size', 'background', 'text-align'],
        correctAnswer: 'color'
    },
    {
        id: 'dca_q10',
        question: 'Which of the following is an example of application software?',
        options: ['MS Word', 'Linux Kernel', 'BIOS', 'Device Driver'],
        correctAnswer: 'MS Word'
    },
    {
        id: 'dca_q11',
        question: 'Which HTTP method is used to send data to the server to create a new resource?',
        options: ['POST', 'GET', 'PUT', 'DELETE'],
        correctAnswer: 'POST'
    },
    {
        id: 'dca_q12',
        question: 'Which function in C returns the length of a string (in <string.h>)?',
        options: ['strlen()', 'strlength()', 'length()', 'size()'],
        correctAnswer: 'strlen()'
    },
    {
        id: 'dca_q13',
        question: 'Which data structure uses FIFO (First In First Out)?',
        options: ['Queue', 'Stack', 'Tree', 'Graph'],
        correctAnswer: 'Queue'
    },
    {
        id: 'dca_q14',
        question: 'Which keyboard shortcut saves a file in most Windows applications?',
        options: ['Ctrl+S', 'Ctrl+P', 'Ctrl+O', 'Ctrl+N'],
        correctAnswer: 'Ctrl+S'
    },
    {
        id: 'dca_q15',
        question: 'Which of these is a markup language?',
        options: ['HTML', 'C++', 'Python', 'Java'],
        correctAnswer: 'HTML'
    },
    {
        id: 'dca_q16',
        question: 'Which device converts digital signals to analog signals for telephone lines?',
        options: ['Modem', 'Router', 'Switch', 'Hub'],
        correctAnswer: 'Modem'
    },
    {
        id: 'dca_q17',
        question: 'Which storage unit is largest?',
        options: ['Terabyte', 'Gigabyte', 'Megabyte', 'Kilobyte'],
        correctAnswer: 'Terabyte'
    },
    {
        id: 'dca_q18',
        question: 'Which sorting algorithm has average-case complexity O(n log n)?',
        options: ['Merge Sort', 'Bubble Sort', 'Selection Sort', 'Insertion Sort'],
        correctAnswer: 'Merge Sort'
    },
    {
        id: 'dca_q19',
        question: 'In database normalization, which normal form removes repeating groups?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctAnswer: '1NF'
    },
    {
        id: 'dca_q20',
        question: 'Which IP version is widely used currently?',
        options: ['IPv4', 'IPv6', 'IPX', 'ICMP'],
        correctAnswer: 'IPv4'
    },
    {
        id: 'dca_q21',
        question: 'Which command in DOS lists files in the current directory?',
        options: ['dir', 'ls', 'pwd', 'cd'],
        correctAnswer: 'dir'
    },
    {
        id: 'dca_q22',
        question: 'Which of the following is a presentation software file extension?',
        options: ['.pptx', '.docx', '.xlsx', '.txt'],
        correctAnswer: '.pptx'
    },
    {
        id: 'dca_q23',
        question: 'Which component executes instructions?',
        options: ['CPU', 'RAM', 'Hard Disk', 'GPU'],
        correctAnswer: 'CPU'
    },
    {
    id: 'dca_q24',
    question: 'Which HTML attribute specifies the source of an image?',
    options: ['src', 'href', 'alt', 'title'],
    correctAnswer: 'src'
  },
    {
        id: 'dca_q25',
        question: 'Which protocol is used to securely browse the web?',
        options: ['HTTPS', 'HTTP', 'FTP', 'TELNET'],
        correctAnswer: 'HTTPS'
    },
    {
        id: 'dca_q26',
        question: 'In C, what is the correct syntax to declare an integer variable x?',
        options: ['int x;', 'integer x;', 'var x int;', 'x int;'],
        correctAnswer: 'int x;'
    },
    {
        id: 'dca_q27',
        question: 'Which of these is a non-relational (NoSQL) database example?',
        options: ['MongoDB', 'MySQL', 'PostgreSQL', 'Oracle'],
        correctAnswer: 'MongoDB'
    },
    {
        id: 'dca_q28',
        question: 'Which OS is open-source and widely used for servers?',
        options: ['Linux', 'Windows 10', 'macOS', 'MS-DOS'],
        correctAnswer: 'Linux'
    },
    {
    id: 'dca_q29',
    question: 'Which HTML tag is used to create a hyperlink?',
    options: ['&lt;a&gt;', '&lt;link&gt;', '&lt;href&gt;', '&lt;url&gt;'],
    correctAnswer: '&lt;a&gt;'
  },
    {
        id: 'dca_q30',
        question: 'Which symbol is used to denote comments in C (single line)?',
        options: ['//', '/* */', '#', '--'],
        correctAnswer: '//'
    },
    {
        id: 'dca_q31',
        question: 'Which of these is a cloud service model providing applications over the internet?',
        options: ['SaaS', 'IaaS', 'PaaS', 'DBaaS'],
        correctAnswer: 'SaaS'
    },
    {
    id: 'dca_q32',
    question: 'Which tag is used to create a table row in HTML?',
    options: ['&lt;tr&gt;', '&lt;td&gt;', '&lt;table&gt;', '&lt;th&gt;'],
    correctAnswer: '&lt;tr&gt;'
  },
    {
        id: 'dca_q33',
        question: 'Which data type in C stores true/false values (in stdbool.h)?',
        options: ['bool', 'int', 'char', 'float'],
        correctAnswer: 'bool'
    },
    {
        id: 'dca_q34',
        question: 'Which device forwards packets between networks?',
        options: ['Router', 'Hub', 'Switch', 'Repeater'],
        correctAnswer: 'Router'
    },
    {
        id: 'dca_q35',
        question: 'Which of the following is used to style HTML pages?',
        options: ['CSS', 'JavaScript', 'SQL', 'PHP'],
        correctAnswer: 'CSS'
    },
    {
        id: 'dca_q36',
        question: 'Which protocol is used to send emails from a client to a mail server?',
        options: ['SMTP', 'IMAP', 'POP3', 'HTTP'],
        correctAnswer: 'SMTP'
    },
    {
        id: 'dca_q37',
        question: 'Which Excel function returns the sum of a range?',
        options: ['SUM()', 'ADD()', 'TOTAL()', 'PLUS()'],
        correctAnswer: 'SUM()'
    },
    {
        id: 'dca_q38',
        question: 'Which of these is a loop construct in C?',
        options: ['for', 'foreach', 'repeat', 'until'],
        correctAnswer: 'for'
    },
    {
        id: 'dca_q39',
        question: 'Which memory type is non-volatile and retains data when power is off?',
        options: ['ROM', 'RAM', 'Cache', 'Registers'],
        correctAnswer: 'ROM'
    },
    {
    id: 'dca_q40',
    question: 'Which HTML element is used to create an ordered list?',
    options: ['&lt;ol&gt;', '&lt;ul&gt;', '&lt;li&gt;', '&lt;dl&gt;'],
    correctAnswer: '&lt;ol&gt;'
  },
    {
        id: 'dca_q41',
        question: 'Which SQL clause is used to filter rows returned by a query?',
        options: ['WHERE', 'ORDER BY', 'GROUP BY', 'HAVING'],
        correctAnswer: 'WHERE'
    },
    {
        id: 'dca_q42',
        question: 'Which of the following languages is used for client-side web scripting?',
        options: ['JavaScript', 'Python', 'C', 'SQL'],
        correctAnswer: 'JavaScript'
    },
    {
        id: 'dca_q43',
        question: 'Which storage technology is faster and uses flash memory?',
        options: ['SSD', 'HDD', 'DVD', 'Blu-ray'],
        correctAnswer: 'SSD'
    },
    {
        id: 'dca_q44',
        question: 'Which C operator is used for equality comparison?',
        options: ['==', '=', '===', ':='],
        correctAnswer: '=='
    },
    {
        id: 'dca_q45',
        question: 'Which HTML attribute provides alternate text for images?',
        options: ['alt', 'title', 'src', 'href'],
        correctAnswer: 'alt'
    },
    {
        id: 'dca_q46',
        question: 'Which Windows utility helps schedule tasks to run automatically?',
        options: ['Task Scheduler', 'Task Manager', 'Device Manager', 'Event Viewer'],
        correctAnswer: 'Task Scheduler'
    },
    {
        id: 'dca_q47',
        question: 'Which sorting algorithm repeatedly swaps adjacent elements if they are in wrong order?',
        options: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Heap Sort'],
        correctAnswer: 'Bubble Sort'
    },
    {
    id: 'dca_q48',
    question: 'Which tag is used to include JavaScript code in HTML?',
    options: ['&lt;script&gt;', '&lt;js&gt;', '&lt;code&gt;', '&lt;javascript&gt;'],
    correctAnswer: '&lt;script&gt;'
  },
    {
        id: 'dca_q49',
        question: 'Which of these is an example of a loop that runs while a condition is true in C?',
        options: ['while', 'for', 'do-while', 'All of the above'],
        correctAnswer: 'All of the above'
    },
    {
        id: 'dca_q50',
        question: 'Which network topology connects all nodes to a single central device?',
        options: ['Star', 'Ring', 'Bus', 'Mesh'],
        correctAnswer: 'Star'
    },
     {
    id: 'dca_q51',
    question: 'Which HTML tag is used for paragraph text?',
    options: ['&lt;p&gt;', '&lt;div&gt;', '&lt;span&gt;', '&lt;section&gt;'],
    correctAnswer: '&lt;p&gt;'
  },
    {
        id: 'dca_q52',
        question: 'Which command in SQL is used to remove a table and its data?',
        options: ['DROP TABLE', 'DELETE TABLE', 'TRUNCATE TABLE', 'REMOVE TABLE'],
        correctAnswer: 'DROP TABLE'
    },
    {
        id: 'dca_q53',
        question: 'Which of the following is used to make a website responsive?',
        options: ['CSS Media Queries', 'HTML Tables', 'Static Images', 'Framesets'],
        correctAnswer: 'CSS Media Queries'
    },
    {
        id: 'dca_q54',
        question: 'Which data type is typically used to store decimal numbers in C?',
        options: ['float', 'int', 'char', 'long'],
        correctAnswer: 'float'
    },
    {
        id: 'dca_q55',
        question: 'Which key combination pastes content from clipboard in Windows?',
        options: ['Ctrl+V', 'Ctrl+C', 'Ctrl+X', 'Ctrl+Z'],
        correctAnswer: 'Ctrl+V'
    },
     {
    id: 'dca_q56',
    question: 'Which HTML tag is used to define the document title shown in browser tab?',
    options: ['&lt;title&gt;', '&lt;head&gt;', '&lt;meta&gt;', '&lt;header&gt;'],
    correctAnswer: '&lt;title&gt;'
  },
    {
        id: 'dca_q57',
        question: 'Which binary number equals decimal 5?',
        options: ['101', '111', '110', '100'],
        correctAnswer: '101'
    },
    {
        id: 'dca_q58',
        question: 'Which SQL function returns the number of rows in a result set?',
        options: ['COUNT()', 'SUM()', 'AVG()', 'MAX()'],
        correctAnswer: 'COUNT()'
    },
    {
    id: 'dca_q59',
    question: 'Which HTML element is used to collect user input in a form?',
    options: ['&lt;input&gt;', '&lt;form&gt;', '&lt;button&gt;', '&lt;label&gt;'],
    correctAnswer: '&lt;input&gt;'
  },
    {
        id: 'dca_q60',
        question: 'Which of these is a client for version control widely used in development?',
        options: ['Git', 'SVN', 'Mercurial', 'All of the above'],
        correctAnswer: 'Git'
    },
    {
        id: 'dca_q61',
        question: 'Which of the following is a primary key characteristic in a database table?',
        options: ['Unique', 'Nullable', 'Duplicate', 'Non-indexed'],
        correctAnswer: 'Unique'
    },
    {
        id: 'dca_q62',
        question: 'Which C keyword is used to return a value from a function?',
        options: ['return', 'break', 'exit', 'goto'],
        correctAnswer: 'return'
    },
    {
        id: 'dca_q63',
        question: 'Which HTML tag creates an unordered list?',
        options: ['<ul>', '<ol>', '<li>', '<dl>'],
        correctAnswer: '<ul>'
    },
    {
        id: 'dca_q64',
        question: 'Which protocol is used to securely transfer files over SSH?',
        options: ['SFTP', 'FTP', 'HTTP', 'SMTP'],
        correctAnswer: 'SFTP'
    },
    {
        id: 'dca_q65',
        question: 'Which Windows shortcut opens the Run dialog?',
        options: ['Windows+R', 'Ctrl+R', 'Alt+R', 'Windows+E'],
        correctAnswer: 'Windows+R'
    },
    {
        id: 'dca_q66',
        question: 'Which of these is used to create dynamic behavior on web pages?',
        options: ['JavaScript', 'HTML', 'CSS', 'XML'],
        correctAnswer: 'JavaScript'
    },
    {
        id: 'dca_q67',
        question: 'Which SQL clause is used to arrange the results in a specific order?',
        options: ['ORDER BY', 'GROUP BY', 'WHERE', 'HAVING'],
        correctAnswer: 'ORDER BY'
    },
    {
        id: 'dca_q68',
        question: 'Which algorithmic concept divides a problem into subproblems then combines results?',
        options: ['Divide and Conquer', 'Greedy', 'Dynamic Programming', 'Brute Force'],
        correctAnswer: 'Divide and Conquer'
    },
    {
        id: 'dca_q69',
        question: 'Which of the following is a front-end framework/library?',
        options: ['React', 'Django', 'Flask', 'Laravel'],
        correctAnswer: 'React'
    },
    {
    id: 'dca_q70',
    question: 'Which tag is used to create a line break in HTML?',
    options: ['&lt;br&gt;', '&lt;hr&gt;', '&lt;break&gt;', '&lt;lb&gt;'],
    correctAnswer: '&lt;br&gt;'
  },
    {
        id: 'dca_q71',
        question: 'Which of the following stores the URL of a linked page in HTML?',
        options: ['href attribute', 'src attribute', 'alt attribute', 'title attribute'],
        correctAnswer: 'href attribute'
    },
    {
        id: 'dca_q72',
        question: 'Which C standard library header contains printf()?',
        options: ['stdio.h', 'stdlib.h', 'string.h', 'math.h'],
        correctAnswer: 'stdio.h'
    },
    {
        id: 'dca_q73',
        question: 'Which of these is a wireless network security protocol stronger than WEP?',
        options: ['WPA/WPA2', 'WEP', 'Open', 'WPS'],
        correctAnswer: 'WPA/WPA2'
    },
    {
        id: 'dca_q74',
        question: 'Which tool is used to inspect HTML and CSS of a webpage in browser?',
        options: ['Developer Tools (F12)', 'Notepad', 'Paint', 'Calculator'],
        correctAnswer: 'Developer Tools (F12)'
    },
    {
        id: 'dca_q75',
        question: 'Which data structure uses LIFO (Last In First Out)?',
        options: ['Stack', 'Queue', 'Tree', 'Graph'],
        correctAnswer: 'Stack'
    },
    {
        id: 'dca_q76',
        question: 'Which function in Excel finds the average of values?',
        options: ['AVERAGE()', 'AVG()', 'MEAN()', 'SUM()/COUNT()'],
        correctAnswer: 'AVERAGE()'
    },
    {
        id: 'dca_q77',
        question: 'Which tag groups related elements in a form in HTML?',
        options: ['<fieldset>', '<group>', '<div>', '<form>'],
        correctAnswer: '<fieldset>'
    },
    {
        id: 'dca_q78',
        question: 'Which of the following is a popular NoSQL key-value store?',
        options: ['Redis', 'MySQL', 'PostgreSQL', 'SQLite'],
        correctAnswer: 'Redis'
    },
    {
        id: 'dca_q79',
        question: 'Which operator in C increments a variable by 1?',
        options: ['++', '--', '+=', '-='],
        correctAnswer: '++'
    },
    {
        id: 'dca_q80',
        question: 'Which HTTP status code indicates "OK"?',
        options: ['200', '404', '500', '403'],
        correctAnswer: '200'
    },
  {
    id: 'dca_q81',
    question: 'Which HTML element is used to embed an external webpage?',
    options: ['&lt;iframe&gt;', '&lt;embed&gt;', '&lt;object&gt;', '&lt;frame&gt;'],
    correctAnswer: '&lt;iframe&gt;'
  },
    {
        id: 'dca_q82',
        question: 'Which of these is an IDE commonly used for C programming?',
        options: ['Code::Blocks', 'Photoshop', 'Excel', 'PowerPoint'],
        correctAnswer: 'Code::Blocks'
    },
    {
        id: 'dca_q83',
        question: 'Which database object stores data in rows and columns?',
        options: ['Table', 'View', 'Index', 'Procedure'],
        correctAnswer: 'Table'
    },
    {
        id: 'dca_q84',
        question: 'Which CSS rule sets the font size of text?',
        options: ['font-size', 'text-size', 'size', 'font-style'],
        correctAnswer: 'font-size'
    },
    {
        id: 'dca_q85',
        question: 'Which command-line utility tests connectivity to another host?',
        options: ['ping', 'tracert', 'ipconfig', 'netstat'],
        correctAnswer: 'ping'
    },
    {
        id: 'dca_q86',
        question: 'Which of these is a component of URL after the domain name indicating path?',
        options: ['Path', 'Protocol', 'Port', 'Query string'],
        correctAnswer: 'Path'
    },
    {
        id: 'dca_q87',
        question: 'Which SQL keyword groups rows that have the same values in specified columns?',
        options: ['GROUP BY', 'ORDER BY', 'WHERE', 'HAVING'],
        correctAnswer: 'GROUP BY'
    },
    {
        id: 'dca_q88',
        question: 'Which of the following is a Linux package manager?',
        options: ['apt', 'msi', 'exe', 'dmg'],
        correctAnswer: 'apt'
    },
    {
        id: 'dca_q89',
        question: 'Which C keyword is used to define a constant macro?',
        options: ['#define', 'const', 'static', 'extern'],
        correctAnswer: '#define'
    },
    {
    id: 'dca_q90',
    question: 'Which HTML input type is used for email addresses?',
    options: ['email', 'text', 'tel', 'url'],
    correctAnswer: 'email'
  },
    {
        id: 'dca_q91',
        question: 'Which of the following sorts is in-place and has average-case O(n log n)?',
        options: ['Quick Sort', 'Merge Sort', 'Counting Sort', 'Radix Sort'],
        correctAnswer: 'Quick Sort'
    },
    {
        id: 'dca_q92',
        question: 'Which HTTP method is used to delete a resource?',
        options: ['DELETE', 'GET', 'POST', 'PUT'],
        correctAnswer: 'DELETE'
    },
    {
        id: 'dca_q93',
        question: 'Which of these best describes "virtual memory"?',
        options: ['Using disk space to simulate extra RAM', 'Extra physical RAM', 'Faster CPU cache', 'Network memory'],
        correctAnswer: 'Using disk space to simulate extra RAM'
    },
    {
        id: 'dca_q94',
        question: 'Which tag is used to create a table header cell in HTML?',
        options: ['<th>', '<td>', '<tr>', '<thead>'],
        correctAnswer: '<th>'
    },
    {
        id: 'dca_q95',
        question: 'Which of the following is used to prevent cross-site scripting (XSS)?',
        options: ['Input validation and output encoding', 'Using plain HTTP', 'Disabling cookies', 'Using inline scripts freely'],
        correctAnswer: 'Input validation and output encoding'
    },
    {
        id: 'dca_q96',
        question: 'Which operator in C is used for logical AND?',
        options: ['&&', '||', '&', '|'],
        correctAnswer: '&&'
    },
    {
        id: 'dca_q97',
        question: 'Which CSS property controls the space between lines of text?',
        options: ['line-height', 'letter-spacing', 'text-indent', 'word-spacing'],
        correctAnswer: 'line-height'
    },
    {
        id: 'dca_q98',
        question: 'Which of these is a NoSQL database type focused on documents?',
        options: ['Document store (e.g., MongoDB)', 'Relational', 'Key-value', 'Graph'],
        correctAnswer: 'Document store (e.g., MongoDB)'
    },
    {
        id: 'dca_q99',
        question: 'Which symbol begins an ID selector in CSS?',
        options: ['#', '.', '*', '$'],
        correctAnswer: '#'
    },
    {
        id: 'dca_q100',
        question: 'Which SQL clause is used to restrict groups after GROUP BY?',
        options: ['HAVING', 'WHERE', 'ORDER BY', 'LIMIT'],
        correctAnswer: 'HAVING'
    },
    {
        id: 'dca_q101',
        question: 'Which HTML input attribute makes a field required?',
        options: ['required', 'mandatory', 'validate', 'needed'],
        correctAnswer: 'required'
    },
    {
        id: 'dca_q102',
        question: 'Which of the following is used to manage versions of code collaboratively?',
        options: ['Git', 'FTP', 'HTTP', 'SMTP'],
        correctAnswer: 'Git'
    },
    {
        id: 'dca_q103',
        question: 'Which network device reduces collisions by dividing a network into segments?',
        options: ['Switch', 'Hub', 'Repeater', 'Modem'],
        correctAnswer: 'Switch'
    },
    {
        id: 'dca_q104',
        question: 'Which function in C converts a string to an integer?',
        options: ['atoi()', 'itoa()', 'atof()', 'strtol()'],
        correctAnswer: 'atoi()'
    },
    {
        id: 'dca_q105',
        question: 'Which of the following helps prevent SQL injection?',
        options: ['Use parameterized queries / prepared statements', 'Concatenate user input into SQL', 'Disable database logging', 'Allow any input'],
        correctAnswer: 'Use parameterized queries / prepared statements'
    },
    {
        id: 'dca_q106',
        question: 'Which HTML element is used to group navigation links?',
        options: ['<nav>', '<div>', '<section>', '<aside>'],
        correctAnswer: '<nav>'
    },
    {
        id: 'dca_q107',
        question: 'Which data structure is best to implement recursion stack behavior?',
        options: ['Stack', 'Queue', 'Linked List', 'Heap'],
        correctAnswer: 'Stack'
    },
    {
        id: 'dca_q108',
        question: 'Which CSS property makes text bold?',
        options: ['font-weight', 'font-style', 'text-weight', 'font-variant'],
        correctAnswer: 'font-weight'
    },
    {
        id: 'dca_q109',
        question: 'Which SQL command removes all rows but keeps the table structure?',
        options: ['TRUNCATE TABLE', 'DELETE FROM', 'DROP TABLE', 'REMOVE ALL'],
        correctAnswer: 'TRUNCATE TABLE'
    },
    {
        id: 'dca_q110',
        question: 'Which of these protocols resolves hostnames to IP addresses?',
        options: ['DNS', 'FTP', 'SMTP', 'HTTP'],
        correctAnswer: 'DNS'
    },
    {
        id: 'dca_q111',
        question: 'Which built-in function in C computes the square root (math.h)?',
        options: ['sqrt()', 'pow()', 'abs()', 'log()'],
        correctAnswer: 'sqrt()'
    },
   {
    id: 'dca_q112',
    question: 'Which HTML tag is used to define an unordered list item?',
    options: ['&lt;li&gt;', '&lt;ul&gt;', '&lt;ol&gt;', '&lt;dl&gt;'],
    correctAnswer: '&lt;li&gt;'
  },
    {
        id: 'dca_q113',
        question: 'Which of these is a benefit of using functions in programming?',
        options: ['Modularity and code reuse', 'Slower execution', 'Larger code size', 'Increased global variables'],
        correctAnswer: 'Modularity and code reuse'
    },
    {
        id: 'dca_q114',
        question: 'Which HTTP header is used to indicate returned content type?',
        options: ['Content-Type', 'Host', 'User-Agent', 'Accept'],
        correctAnswer: 'Content-Type'
    },
    {
    id: 'dca_q115',
    question: 'Which HTML element is used to display a caption for a table?',
    options: ['&lt;caption&gt;', '&lt;title&gt;', '&lt;thead&gt;', '&lt;tfoot&gt;'],
    correctAnswer: '&lt;caption&gt;'
  },
    {
        id: 'dca_q116',
        question: 'Which data structure uses nodes with pointers to next elements?',
        options: ['Linked List', 'Array', 'Stack', 'Queue'],
        correctAnswer: 'Linked List'
    },
    {
        id: 'dca_q117',
        question: 'Which of these is used to secure a website with SSL/TLS?',
        options: ['Obtain and install an SSL/TLS certificate', 'Use plain HTTP', 'Disable cookies', 'Use FTP'],
        correctAnswer: 'Obtain and install an SSL/TLS certificate'
    },
    {
        id: 'dca_q118',
        question: 'Which function in C is used to allocate dynamic memory?',
        options: ['malloc()', 'alloc()', 'new()', 'create()'],
        correctAnswer: 'malloc()'
    },
    {
        id: 'dca_q119',
        question: 'Which HTML attribute specifies an alternate language for content?',
        options: ['lang', 'type', 'charset', 'hreflang'],
        correctAnswer: 'lang'
    },
    {
        id: 'dca_q120',
        question: 'Which of these BEST describes "open source" software?',
        options: ['Source code available for modification and distribution', 'Proprietary licensed', 'Completely free of cost always', 'Only for government use'],
        correctAnswer: 'Source code available for modification and distribution'
    },
    {
        id: 'dca_q121',
        question: 'Which SQL clause is used to limit the number of rows returned?',
        options: ['LIMIT', 'TOP', 'FETCH', 'ALL of these depending on DB'],
        correctAnswer: 'ALL of these depending on DB'
    },
     {
    id: 'dca_q122',
    question: 'Which HTML tag is used to include metadata like character set?',
    options: ['&lt;meta&gt;', '&lt;link&gt;', '&lt;script&gt;', '&lt;style&gt;'],
    correctAnswer: '&lt;meta&gt;'
  },
    {
        id: 'dca_q123',
        question: 'Which programming paradigm focuses on objects and classes?',
        options: ['Object-Oriented Programming', 'Procedural Programming', 'Functional Programming', 'Logic Programming'],
        correctAnswer: 'Object-Oriented Programming'
    },
    {
        id: 'dca_q124',
        question: 'Which of these is used to compress files into an archive?',
        options: ['zip', 'tar', 'rar', 'All of the above'],
        correctAnswer: 'All of the above'
    },
    {
        id: 'dca_q125',
        question: 'Which C library function compares two strings?',
        options: ['strcmp()', 'strcpy()', 'strlen()', 'strcat()'],
        correctAnswer: 'strcmp()'
    },
    {
        id: 'dca_q126',
        question: 'Which CSS display value makes an element flow inline with text?',
        options: ['inline', 'block', 'flex', 'grid'],
        correctAnswer: 'inline'
    },
    {
        id: 'dca_q127',
        question: 'Which of these is a backup strategy storing multiple versions over time?',
        options: ['Incremental / Differential backups', 'Single full backup only', 'No backup', 'Manual copy only'],
        correctAnswer: 'Incremental / Differential backups'
    },
    {
        id: 'dca_q128',
        question: 'Which SQL construct allows joining tables on a related column?',
        options: ['JOIN', 'UNION', 'INTERSECT', 'EXCEPT'],
        correctAnswer: 'JOIN'
    },
     {
    id: 'dca_q129',
    question: 'Which HTML element is used to define emphasized text?',
    options: ['&lt;em&gt;', '&lt;strong&gt;', '&lt;i&gt;', '&lt;b&gt;'],
    correctAnswer: '&lt;em&gt;'
  },
    {
        id: 'dca_q130',
        question: 'Which HTML element is used to define emphasized text?',
        options: ['<em>', '<strong>', '<i>', '<b>'],
        correctAnswer: '<em>'
    },
    {
        id: 'dca_q131',
        question: 'Which of the following is a measure of CPU speed?',
        options: ['GHz', 'MB', 'GB', 'RPM'],
        correctAnswer: 'GHz'
    },
    {
        id: 'dca_q132',
        question: 'Which function in C copies a string from source to destination?',
        options: ['strcpy()', 'strcmp()', 'strcat()', 'strlen()'],
        correctAnswer: 'strcpy()'
    },
    {
        id: 'dca_q133',
        question: 'Which HTML tag is used to group block-level content?',
        options: ['<div>', '<span>', '<a>', '<p>'],
        correctAnswer: '<div>'
    },
    {
        id: 'dca_q134',
        question: 'Which of the following is a commonly used RESTful data format?',
        options: ['JSON', 'HTML', 'SVG', 'BMP'],
        correctAnswer: 'JSON'
    },
    {
        id: 'dca_q135',
        question: 'Which data structure is most suitable for implementing priority queues?',
        options: ['Heap', 'Stack', 'Queue', 'Array'],
        correctAnswer: 'Heap'
    },
    {
        id: 'dca_q136',
        question: 'Which CSS unit is relative to the root element font-size?',
        options: ['rem', 'px', 'em', '%'],
        correctAnswer: 'rem'
    },
    {
        id: 'dca_q137',
        question: 'Which of these is a client-side storage option in browsers?',
        options: ['Local Storage', 'Server Database', 'FTP Server', 'SMTP Server'],
        correctAnswer: 'Local Storage'
    },
    {
        id: 'dca_q138',
        question: 'Which SQL keyword removes duplicate rows from results?',
        options: ['DISTINCT', 'UNIQUE', 'UNION', 'GROUP BY'],
        correctAnswer: 'DISTINCT'
    },
    {
        id: 'dca_q139',
        question: 'Which HTML tag is deprecated in modern HTML for bold text (use CSS instead)?',
        options: ['<b>', '<strong>', '<i>', '<em>'],
        correctAnswer: '<b>'
    },
    {
        id: 'dca_q140',
        question: 'Which network protocol translates between private and public IPs (NAT)?',
        options: ['NAT is performed by routers / gateways', 'DNS', 'DHCP', 'SMTP'],
        correctAnswer: 'NAT is performed by routers / gateways'
    },
    {
        id: 'dca_q141',
        question: 'Which of the following is used to check disk space usage on Linux?',
        options: ['df', 'dir', 'ipconfig', 'netstat'],
        correctAnswer: 'df'
    },
    {
        id: 'dca_q142',
        question: 'Which HTML input attribute limits the maximum length of text?',
        options: ['maxlength', 'max', 'limit', 'size'],
        correctAnswer: 'maxlength'
    },
    {
        id: 'dca_q143',
        question: 'Which of these is an example of two-factor authentication?',
        options: ['Password + OTP', 'Password only', 'Fingerprint only', 'Username only'],
        correctAnswer: 'Password + OTP'
    },
    {
        id: 'dca_q144',
        question: 'Which C keyword is used to create a loop that executes at least once?',
        options: ['do-while', 'for', 'while', 'foreach'],
        correctAnswer: 'do-while'
    },
    {
        id: 'dca_q145',
        question: 'Which CSS property changes the background image of an element?',
        options: ['background-image', 'bg-image', 'image-src', 'background-src'],
        correctAnswer: 'background-image'
    },
    {
        id: 'dca_q146',
        question: 'Which of the following is an advantage of indexing in databases?',
        options: ['Faster query retrieval', 'Slower search', 'More disk errors', 'Deletes data automatically'],
        correctAnswer: 'Faster query retrieval'
    },
    {
        id: 'dca_q147',
        question: 'Which HTML element defines a section in a document?',
        options: ['<section>', '<div>', '<article>', 'All of the above depending on use'],
        correctAnswer: 'All of the above depending on use'
    },
    {
        id: 'dca_q148',
        question: 'Which protocol is commonly used for remote secure shell access?',
        options: ['SSH', 'Telnet', 'FTP', 'SMTP'],
        correctAnswer: 'SSH'
    },
    {
        id: 'dca_q149',
        question: 'Which of these is used to convert HTML to plain text safely in web apps?',
        options: ['HTML encoding / escaping', 'Direct innerHTML with user input', 'Eval()', 'Unescaped rendering'],
        correctAnswer: 'HTML encoding / escaping'
    },
    {
        id: 'dca_q150',
        question: 'Which SQL function returns the maximum value in a column?',
        options: ['MAX()', 'MIN()', 'SUM()', 'AVG()'],
        correctAnswer: 'MAX()'
    },
    {
        id: 'dca_q151',
        question: 'Which of these is NOT an advantage of normalized database?',
        options: ['Eliminates redundancy', 'Improves consistency', 'Complex queries sometimes', 'Increased data duplication'],
        correctAnswer: 'Increased data duplication'
    },
    {
        id: 'dca_q152',
        question: 'Which HTML input type allows uploading files?',
        options: ['file', 'text', 'email', 'password'],
        correctAnswer: 'file'
    },
    {
        id: 'dca_q153',
        question: 'Which of the following best describes "cache" in computing?',
        options: ['Fast temporary storage to speed up repeated access', 'Permanent long-term storage', 'A programming language', 'A type of database'],
        correctAnswer: 'Fast temporary storage to speed up repeated access'
    },
    {
        id: 'dca_q154',
        question: 'Which operator in C is used for bitwise OR?',
        options: ['|', '&', '^', '~'],
        correctAnswer: '|'
    },
    {
        id: 'dca_q155',
        question: 'Which CSS property aligns text horizontally?',
        options: ['text-align', 'vertical-align', 'align-items', 'justify-content'],
        correctAnswer: 'text-align'
    },
    {
        id: 'dca_q156',
        question: 'Which command shows the routing table on Windows?',
        options: ['route print', 'ipconfig', 'netstat -r', 'tracert'],
        correctAnswer: 'route print'
    },
    {
        id: 'dca_q157',
        question: 'Which of these is used to prevent CSRF attacks?',
        options: ['Use anti-CSRF tokens and validate origin', 'Disable HTTPS', 'Allow cross-site requests', 'Store passwords in cookies'],
        correctAnswer: 'Use anti-CSRF tokens and validate origin'
    },
    {
        id: 'dca_q158',
        question: 'Which SQL keyword combines results from two SELECT statements removing duplicates?',
        options: ['UNION', 'JOIN', 'INTERSECT', 'MERGE'],
        correctAnswer: 'UNION'
    },
    {
        id: 'dca_q159',
        question: 'Which HTML tag is used to define a table footer?',
        options: ['<tfoot>', '<tbody>', '<thead>', '<tfoot>'],
        correctAnswer: '<tfoot>'
    },
    {
        id: 'dca_q160',
        question: 'Which of the following is used to convert a string to lowercase in C (manually)?',
        options: ['Use tolower() in a loop', 'strlwr() standard', 'tolowercase()', 'strlow()'],
        correctAnswer: 'Use tolower() in a loop'
    },
    {
        id: 'dca_q161',
        question: 'Which of the following is a protocol for email retrieval that removes messages from server by default?',
        options: ['POP3', 'IMAP', 'SMTP', 'HTTP'],
        correctAnswer: 'POP3'
    },
    {
        id: 'dca_q162',
        question: 'Which tag is used to define a clickable button in HTML?',
        options: ['<button>', '<input type="button">', 'Both are correct', '<btn>'],
        correctAnswer: 'Both are correct'
    },
    {
        id: 'dca_q163',
        question: 'Which of these is true about dynamic memory allocated by malloc in C?',
        options: ['Must be freed using free()', 'Automatically freed on function exit', 'Cannot be freed', 'Freed by compiler'],
        correctAnswer: 'Must be freed using free()'
    },
    {
        id: 'dca_q164',
        question: 'Which CSS selector selects elements with class "menu"?',
        options: ['.menu', '#menu', 'menu', '*menu'],
        correctAnswer: '.menu'
    },
    {
        id: 'dca_q165',
        question: 'Which algorithm finds shortest path in weighted graphs without negative weights?',
        options: ['Dijkstra\'s Algorithm', 'Bellman-Ford', 'Floyd-Warshall', 'Prim\'s'],
        correctAnswer: 'Dijkstra\'s Algorithm'
    },
    {
        id: 'dca_q166',
        question: 'Which HTTP header can be used to control caching behavior?',
        options: ['Cache-Control', 'Content-Type', 'Host', 'User-Agent'],
        correctAnswer: 'Cache-Control'
    },
    {
        id: 'dca_q167',
        question: 'Which HTML tag semantically represents self-contained composition?',
        options: ['<article>', '<div>', '<span>', '<section>'],
        correctAnswer: '<article>'
    },
    {
        id: 'dca_q168',
        question: 'Which of the following is used to secure passwords at rest?',
        options: ['Hashing with salt', 'Storing plain text', 'Encrypt with reversible key and share', 'Use base64 only'],
        correctAnswer: 'Hashing with salt'
    },
    {
        id: 'dca_q169',
        question: 'Which SQL clause is used to filter groups with aggregation conditions?',
        options: ['HAVING', 'WHERE', 'GROUP BY', 'ORDER BY'],
        correctAnswer: 'HAVING'
    },
    {
        id: 'dca_q170',
        question: 'Which HTML tag is used to define document metadata and links to stylesheets?',
        options: ['<head>', '<header>', '<meta>', '<link>'],
        correctAnswer: '<head>'
    },
    {
        id: 'dca_q171',
        question: 'Which of these best describes "responsive web design"?',
        options: ['Design that adapts layout to different screen sizes', 'Design for desktop only', 'Using fixed-width layouts', 'Design without CSS'],
        correctAnswer: 'Design that adapts layout to different screen sizes'
    },
    {
        id: 'dca_q172',
        question: 'Which C standard function converts a character to uppercase?',
        options: ['toupper()', 'touppercase()', 'toUpper()', 'strtoupper()'],
        correctAnswer: 'toupper()'
    },
    {
        id: 'dca_q173',
        question: 'Which of the following is NOT a valid HTTP status code category?',
        options: ['900s', '200s', '400s', '500s'],
        correctAnswer: '900s'
    },
    {
        id: 'dca_q174',
        question: 'Which of these is a microformat used for vector graphics on the web?',
        options: ['SVG', 'PNG', 'JPEG', 'BMP'],
        correctAnswer: 'SVG'
    },
    {
        id: 'dca_q175',
        question: 'Which of the following is a common file permission notation on Linux?',
        options: ['rwxr-xr-x', '777-777', 'read-write', 'allow-all'],
        correctAnswer: 'rwxr-xr-x'
    },
    {
        id: 'dca_q176',
        question: 'Which HTML5 element is used to play audio?',
        options: ['<audio>', '<sound>', '<media>', '<play>'],
        correctAnswer: '<audio>'
    },
    {
        id: 'dca_q177',
        question: 'Which of these is used to create a responsive grid layout in CSS?',
        options: ['CSS Grid / Flexbox', 'Tables only', 'Frames', 'Marquee'],
        correctAnswer: 'CSS Grid / Flexbox'
    },
    {
        id: 'dca_q178',
        question: 'Which is the correct way to start a comment block in C?',
        options: ['/*', '//', '<!--', '#'],
        correctAnswer: '/*'
    },
    {
        id: 'dca_q179',
        question: 'Which SQL statement updates existing records in a table?',
        options: ['UPDATE', 'INSERT', 'DELETE', 'ALTER'],
        correctAnswer: 'UPDATE'
    },
    {
        id: 'dca_q180',
        question: 'Which tag is used to include an external CSS file in HTML?',
        options: ['<link rel="stylesheet" href="style.css">', '<script src="style.css">', '<style src="style.css">', '<css src="style.css">'],
        correctAnswer: '<link rel="stylesheet" href="style.css">'
    },
    {
        id: 'dca_q181',
        question: 'Which of the following is a benefit of modular programming?',
        options: ['Easier maintenance and reuse', 'Slower execution always', 'Larger code duplication', 'Impossible testing'],
        correctAnswer: 'Easier maintenance and reuse'
    },
    {
        id: 'dca_q182',
        question: 'Which HTTP header field indicates the browser or client making the request?',
        options: ['User-Agent', 'Referer', 'Host', 'Accept'],
        correctAnswer: 'User-Agent'
    },
    {
        id: 'dca_q183',
        question: 'Which of the following converts binary to decimal manually for 1010 (binary)?',
        options: ['10', '8', '12', '5'],
        correctAnswer: '10'
    },
    {
        id: 'dca_q184',
        question: 'Which HTML tag is used to define a clickable link that opens in a new tab?',
        options: ['<a target="_blank" href="...">', '<link target="_blank">', '<a newtab>', '<a open>'],
        correctAnswer: '<a target="_blank" href="...">'
    },
    {
        id: 'dca_q185',
        question: 'Which of these is a database index type for full-text search?',
        options: ['Full-text index', 'B-tree index', 'Hash index', 'Bitmap index'],
        correctAnswer: 'Full-text index'
    },
    {
        id: 'dca_q186',
        question: 'Which CSS property sets the element to be hidden but still take space?',
        options: ['visibility: hidden', 'display: none', 'opacity: 0', 'hidden: true'],
        correctAnswer: 'visibility: hidden'
    },
    {
        id: 'dca_q187',
        question: 'Which of these JavaScript methods converts a JSON string to an object?',
        options: ['JSON.parse()', 'JSON.stringify()', 'toJSON()', 'parseJSON()'],
        correctAnswer: 'JSON.parse()'
    },
    {
        id: 'dca_q188',
        question: 'Which of the following commands copies files on Linux?',
        options: ['cp', 'mv', 'rm', 'ls'],
        correctAnswer: 'cp'
    },
    {
        id: 'dca_q189',
        question: 'Which SQL command adds a new column to an existing table?',
        options: ['ALTER TABLE ... ADD COLUMN', 'UPDATE TABLE ... ADD', 'CREATE COLUMN', 'INSERT COLUMN'],
        correctAnswer: 'ALTER TABLE ... ADD COLUMN'
    },
    {
        id: 'dca_q190',
        question: 'Which HTML element is used for emphasized small print like copyrights?',
        options: ['<small>', '<em>', '<i>', '<sup>'],
        correctAnswer: '<small>'
    },
    {
        id: 'dca_q191',
        question: 'Which of these is a common web security best practice?',
        options: ['Use HTTPS, validate input, keep software updated', 'Use HTTP only, allow all input, avoid updates', 'Disable firewalls', 'Store passwords in plain text'],
        correctAnswer: 'Use HTTPS, validate input, keep software updated'
    },
    {
        id: 'dca_q192',
        question: 'Which operator in C concatenates strings directly?',
        options: ['There is no direct string concat operator; use strcat()', '++', '+', '&'],
        correctAnswer: 'There is no direct string concat operator; use strcat()'
    },
    {
        id: 'dca_q193',
        question: 'Which of these is a benefit of using CSS classes instead of inline styles?',
        options: ['Reusability and maintainability', 'Longer HTML', 'Slower rendering', 'Impossible to apply'],
        correctAnswer: 'Reusability and maintainability'
    },
    {
        id: 'dca_q194',
        question: 'Which HTTP header helps prevent clickjacking by controlling framing?',
        options: ['X-Frame-Options', 'Content-Type', 'Cache-Control', 'Server'],
        correctAnswer: 'X-Frame-Options'
    },
    {
        id: 'dca_q195',
        question: 'Which SQL function returns the average value of a numeric column?',
        options: ['AVG()', 'SUM()', 'COUNT()', 'MEAN()'],
        correctAnswer: 'AVG()'
    },
    {
        id: 'dca_q196',
        question: 'Which HTML element provides a container for navigation links typically?',
        options: ['<nav>', '<footer>', '<aside>', '<header>'],
        correctAnswer: '<nav>'
    },
    {
        id: 'dca_q197',
        question: 'Which algorithm is best for searching a sorted array?',
        options: ['Binary Search', 'Linear Search', 'Bubble Search', 'Hash Search'],
        correctAnswer: 'Binary Search'
    },
    {
        id: 'dca_q198',
        question: 'Which of these is used to minify CSS and JS files for production?',
        options: ['Build tools like webpack / terser', 'Notepad', 'MS Word', 'FTP'],
        correctAnswer: 'Build tools like webpack / terser'
    },
    {
        id: 'dca_q199',
        question: 'Which of the following is a server-side scripting language?',
        options: ['PHP', 'HTML', 'CSS', 'SVG'],
        correctAnswer: 'PHP'
    },
    {
        id: 'dca_q200',
        question: 'Which of these best describes "latency" in networking?',
        options: ['Delay before data transfer begins following an instruction', 'Amount of data per second', 'Number of users connected', 'Size of packets'],
        correctAnswer: 'Delay before data transfer begins following an instruction'
    }, {
    id: "dca_q201",
    question: "Which command in Linux displays the current working directory?",
    options: ["pwd", "ls", "cd", "whoami"],
    correctAnswer: "pwd"
  },
  {
    id: "dca_q202",
    question: "Which HTML tag displays an image on a webpage (escaped)?",
    options: ["&lt;img&gt;", "&lt;picture&gt;", "&lt;image&gt;", "&lt;photo&gt;"],
    correctAnswer: "&lt;img&gt;"
  },
  {
    id: "dca_q203",
    question: "Which function in C returns a random number (stdlib.h)?",
    options: ["rand()", "random()", "rando()", "getrand()"],
    correctAnswer: "rand()"
  },
  {
    id: "dca_q204",
    question: "Which of the following is a characteristic of IPv6 vs IPv4?",
    options: ["Larger address space", "Smaller header", "Uses 32-bit addresses", "Deprecated security"],
    correctAnswer: "Larger address space"
  },
  {
    id: "dca_q205",
    question: "Which CSS property sets the text color?",
    options: ["color", "text-color", "font-color", "fg-color"],
    correctAnswer: "color"
  },
  {
    id: "dca_q206",
    question: "Which SQL keyword is used to create a new table?",
    options: ["CREATE TABLE", "NEW TABLE", "MAKE TABLE", "BUILD TABLE"],
    correctAnswer: "CREATE TABLE"
  },
  {
    id: "dca_q207",
    question: "Which tool is commonly used to clone Git repositories?",
    options: ["git clone", "git copy", "svn checkout", "ftp get"],
    correctAnswer: "git clone"
  },
  {
    id: "dca_q208",
    question: "Which of these is a markup language for web pages?",
    options: ["HTML", "C++", "Python", "SQL"],
    correctAnswer: "HTML"
  },
  {
    id: "dca_q209",
    question: "Which of the following is a server-side language?",
    options: ["PHP", "CSS", "HTML", "SVG"],
    correctAnswer: "PHP"
  },
  {
    id: "dca_q210",
    question: "Which of these is a package manager for Node.js?",
    options: ["npm", "pip", "apt", "yum"],
    correctAnswer: "npm"
  },
  {
    id: "dca_q211",
    question: "Which C function converts integer to string (not standard, common approach)?",
    options: ["sprintf()", "atoi()", "strlen()", "strcpy()"],
    correctAnswer: "sprintf()"
  },
  {
    id: "dca_q212",
    question: "Which Windows key shows the Start menu?",
    options: ["Windows key", "Alt", "Ctrl", "Shift"],
    correctAnswer: "Windows key"
  },
  {
    id: "dca_q213",
    question: "Which protocol is used to securely fetch email from a server keeping messages on server?",
    options: ["IMAP", "POP3", "SMTP", "FTP"],
    correctAnswer: "IMAP"
  },
  {
    id: "dca_q214",
    question: "Which Excel feature automatically fills a sequence when you drag the fill handle?",
    options: ["AutoFill", "Flash Fill", "AutoSum", "AutoCorrect"],
    correctAnswer: "AutoFill"
  },
  {
    id: "dca_q215",
    question: "Which of these database constraints ensures uniqueness of column values?",
    options: ["UNIQUE", "NOT NULL", "CHECK", "DEFAULT"],
    correctAnswer: "UNIQUE"
  },
  {
    id: "dca_q216",
    question: "Which HTML attribute specifies a link target (escaped example)?",
    options: ["href", "src", "alt", "title"],
    correctAnswer: "href"
  },
  {
    id: "dca_q217",
    question: "Which of these is a block-level HTML element (escaped)?",
    options: ["&lt;div&gt;", "&lt;span&gt;", "&lt;img&gt;", "&lt;input&gt;"],
    correctAnswer: "&lt;div&gt;"
  },
  {
    id: "dca_q218",
    question: "Which of the following is NOT a relational DBMS?",
    options: ["MongoDB", "MySQL", "PostgreSQL", "SQL Server"],
    correctAnswer: "MongoDB"
  },
  {
    id: "dca_q219",
    question: "Which operator in SQL is used for pattern matching?",
    options: ["LIKE", "MATCH", "COMPARE", "REGEX"],
    correctAnswer: "LIKE"
  },
  {
    id: "dca_q220",
    question: "Which DOS/Windows command copies files?",
    options: ["copy", "move", "del", "dir"],
    correctAnswer: "copy"
  },
  {
    id: "dca_q221",
    question: "Which HTML attribute provides tooltip text when hovering (escaped)?",
    options: ["title", "alt", "tooltip", "hint"],
    correctAnswer: "title"
  },
  {
    id: "dca_q222",
    question: "Which of these is a commonly used HTTP method to update resources?",
    options: ["PUT", "GET", "HEAD", "OPTIONS"],
    correctAnswer: "PUT"
  },
  {
    id: "dca_q223",
    question: "Which data type is appropriate to store true/false values in C99 (escaped)?",
    options: ["bool", "int", "char", "float"],
    correctAnswer: "bool"
  },
  {
    id: "dca_q224",
    question: "Which Windows tool helps manage startup programs?",
    options: ["Task Manager (Startup tab)", "Disk Management", "Event Viewer", "Device Manager"],
    correctAnswer: "Task Manager (Startup tab)"
  },
  {
    id: "dca_q225",
    question: "Which of these is a client-side JS method to find an element by id?",
    options: ["document.getElementById()", "getElement()", "queryById()", "findById()"],
    correctAnswer: "document.getElementById()"
  },
  {
    id: "dca_q226",
    question: "Which command checks network connectivity to a host?",
    options: ["ping", "ipconfig", "tracert", "nslookup"],
    correctAnswer: "ping"
  },
  {
    id: "dca_q227",
    question: "Which HTML tag is used to include a CSS file (escaped)?",
    options: ["&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;", "&lt;script src=\"style.css\"&gt;", "&lt;style src=\"style.css\"&gt;", "&lt;css src=\"style.css\"&gt;"],
    correctAnswer: "&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;"
  },
  {
    id: "dca_q228",
    question: "Which of these commands shows open ports and connections?",
    options: ["netstat", "ipconfig", "ping", "route"],
    correctAnswer: "netstat"
  },
  {
    id: "dca_q229",
    question: "Which HTML tag identifies the largest heading (escaped)?",
    options: ["&lt;h1&gt;", "&lt;h6&gt;", "&lt;h3&gt;", "&lt;h4&gt;"],
    correctAnswer: "&lt;h1&gt;"
  },
  {
    id: "dca_q230",
    question: "Which of the following is used to manage containers (example)?",
    options: ["Docker", "VMware Workstation", "VirtualBox", "Hyper-V"],
    correctAnswer: "Docker"
  },
  {
    id: "dca_q231",
    question: "Which HTML form element allows multiple lines of text input (escaped)?",
    options: ["&lt;textarea&gt;", "&lt;input type=\"text\"&gt;", "&lt;select&gt;", "&lt;fieldset&gt;"],
    correctAnswer: "&lt;textarea&gt;"
  },
  {
    id: "dca_q232",
    question: "Which of these is a Python package manager?",
    options: ["pip", "npm", "gem", "composer"],
    correctAnswer: "pip"
  },
  {
    id: "dca_q233",
    question: "Which SQL clause is used to filter aggregated results?",
    options: ["HAVING", "WHERE", "ORDER BY", "GROUP BY"],
    correctAnswer: "HAVING"
  },
  {
    id: "dca_q234",
    question: "Which Linux command copies directories recursively?",
    options: ["cp -r", "copy /s", "mv -r", "mkdir -p"],
    correctAnswer: "cp -r"
  },
  {
    id: "dca_q235",
    question: "Which tag is used to create a table cell header (escaped)?",
    options: ["&lt;th&gt;", "&lt;td&gt;", "&lt;tr&gt;", "&lt;table&gt;"],
    correctAnswer: "&lt;th&gt;"
  },
  {
    id: "dca_q236",
    question: "Which of these is an example of virtualisation software?",
    options: ["VirtualBox", "Notepad", "Paint", "Calculator"],
    correctAnswer: "VirtualBox"
  },
  {
    id: "dca_q237",
    question: "Which keyboard shortcut copies selected text (Windows)?",
    options: ["Ctrl+C", "Ctrl+V", "Ctrl+X", "Ctrl+Z"],
    correctAnswer: "Ctrl+C"
  },
  {
    id: "dca_q238",
    question: "Which SQL command removes rows from a table but keeps the table structure?",
    options: ["TRUNCATE", "DROP", "DELETE", "REMOVE"],
    correctAnswer: "TRUNCATE"
  },
  {
    id: "dca_q239",
    question: "Which of these is used to speed up database queries by creating pointers?",
    options: ["Index", "Trigger", "View", "Procedure"],
    correctAnswer: "Index"
  },
  {
    id: "dca_q240",
    question: "Which HTML element defines the page footer (escaped)?",
    options: ["&lt;footer&gt;", "&lt;head&gt;", "&lt;aside&gt;", "&lt;nav&gt;"],
    correctAnswer: "&lt;footer&gt;"
  },
  {
    id: "dca_q241",
    question: "Which programming concept allows a function to call itself?",
    options: ["Recursion", "Iteration", "Encapsulation", "Abstraction"],
    correctAnswer: "Recursion"
  },
  {
    id: "dca_q242",
    question: "Which of these is a client-side storage API in browsers?",
    options: ["localStorage", "MySQL", "Redis", "SQLite"],
    correctAnswer: "localStorage"
  },
  {
    id: "dca_q243",
    question: "Which Windows utility can create a system image backup?",
    options: ["Backup and Restore (Windows 7)", "Disk Cleanup", "Defragmenter", "Task Manager"],
    correctAnswer: "Backup and Restore (Windows 7)"
  },
  {
    id: "dca_q244",
    question: "Which HTML attribute indicates input is required (escaped)?",
    options: ["required", "mandatory", "need", "validate"],
    correctAnswer: "required"
  },
  {
    id: "dca_q245",
    question: "Which C operator is used to get the address of a variable?",
    options: ["&", "*", "#", "%"],
    correctAnswer: "&"
  },
  {
    id: "dca_q246",
    question: "Which of these is used to map a domain name to IP addresses?",
    options: ["DNS", "DHCP", "ARP", "NTP"],
    correctAnswer: "DNS"
  },
  {
    id: "dca_q247",
    question: "Which HTML element groups header information (escaped)?",
    options: ["&lt;head&gt;", "&lt;header&gt;", "&lt;nav&gt;", "&lt;main&gt;"],
    correctAnswer: "&lt;head&gt;"
  },
  {
    id: "dca_q248",
    question: "Which of the following is a common NoSQL database?",
    options: ["MongoDB", "Oracle", "SQL Server", "DB2"],
    correctAnswer: "MongoDB"
  },
  {
    id: "dca_q249",
    question: "Which protocol provides secure shell access to remote machines?",
    options: ["SSH", "FTP", "HTTP", "SMTP"],
    correctAnswer: "SSH"
  },
  {
    id: "dca_q250",
    question: "Which CSS property changes the element's margin?",
    options: ["margin", "padding", "border", "gap"],
    correctAnswer: "margin"
  },
  {
    id: "dca_q251",
    question: "Which SQL statement adds new rows to a table?",
    options: ["INSERT INTO", "UPDATE", "CREATE", "ALTER"],
    correctAnswer: "INSERT INTO"
  },
  {
    id: "dca_q252",
    question: "Which of the following is an interpreted language commonly used for scripting in web and automation?",
    options: ["Python", "C", "C++", "Assembly"],
    correctAnswer: "Python"
  },
  {
    id: "dca_q253",
    question: "Which HTML tag is used to mark emphasized text (escaped)?",
    options: ["&lt;em&gt;", "&lt;strong&gt;", "&lt;i&gt;", "&lt;b&gt;"],
    correctAnswer: "&lt;em&gt;"
  },
  {
    id: "dca_q254",
    question: "Which of these is used to resolve DNS locally on your machine (command)?",
    options: ["nslookup", "ipconfig", "ping", "tracert"],
    correctAnswer: "nslookup"
  },
  {
    id: "dca_q255",
    question: "Which of the following is a front-end CSS framework?",
    options: ["Bootstrap", "Django", "Flask", "Node.js"],
    correctAnswer: "Bootstrap"
  },
  {
    id: "dca_q256",
    question: "Which C function concatenates two strings?",
    options: ["strcat()", "strcpy()", "strcmp()", "strlen()"],
    correctAnswer: "strcat()"
  },
  {
    id: "dca_q257",
    question: "Which web status code indicates resource not found?",
    options: ["404", "200", "500", "301"],
    correctAnswer: "404"
  },
  {
    id: "dca_q258",
    question: "Which HTML tag defines a clickable button (escaped)?",
    options: ["&lt;button&gt;", "&lt;input type=\"button\"&gt;", "Both are correct", "&lt;btn&gt;"],
    correctAnswer: "Both are correct"
  },
  {
    id: "dca_q259",
    question: "Which of the following is a NoSQL key-value store?",
    options: ["Redis", "MySQL", "PostgreSQL", "SQLite"],
    correctAnswer: "Redis"
  },
  {
    id: "dca_q260",
    question: "Which of the following is used to automatically run tasks on schedule in Windows?",
    options: ["Task Scheduler", "Task Manager", "Device Manager", "Disk Cleanup"],
    correctAnswer: "Task Scheduler"
  },
  {
    id: "dca_q261",
    question: "Which SQL clause is used to group rows that share a property?",
    options: ["GROUP BY", "ORDER BY", "WHERE", "LIMIT"],
    correctAnswer: "GROUP BY"
  },
  {
    id: "dca_q262",
    question: "Which CSS unit is absolute and equals one pixel on standard displays?",
    options: ["px", "em", "rem", "%"],
    correctAnswer: "px"
  },
  {
    id: "dca_q263",
    question: "Which Linux command creates a new directory?",
    options: ["mkdir", "rmdir", "touch", "rm"],
    correctAnswer: "mkdir"
  },
  {
    id: "dca_q264",
    question: "Which HTML element defines an ordered list (escaped)?",
    options: ["&lt;ol&gt;", "&lt;ul&gt;", "&lt;li&gt;", "&lt;dl&gt;"],
    correctAnswer: "&lt;ol&gt;"
  },
  {
    id: "dca_q265",
    question: "Which database object is used to retrieve pre-defined result sets?",
    options: ["View", "Trigger", "Index", "Sequence"],
    correctAnswer: "View"
  },
  {
    id: "dca_q266",
    question: "Which of these methods improves website performance by compressing assets?",
    options: ["Minification", "Formatting", "Beautification", "Verbose mode"],
    correctAnswer: "Minification"
  },
  {
    id: "dca_q267",
    question: "Which SQL function returns the smallest value in a column?",
    options: ["MIN()", "MAX()", "SUM()", "AVG()"],
    correctAnswer: "MIN()"
  },
  {
    id: "dca_q268",
    question: "Which HTML tag defines a table row (escaped)?",
    options: ["&lt;tr&gt;", "&lt;td&gt;", "&lt;th&gt;", "&lt;table&gt;"],
    correctAnswer: "&lt;tr&gt;"
  },
  {
    id: "dca_q269",
    question: "Which command lists files (Linux)?",
    options: ["ls", "dir", "list", "show"],
    correctAnswer: "ls"
  },
  {
    id: "dca_q270",
    question: "Which CSS property sets the element's width?",
    options: ["width", "size", "length", "dimension"],
    correctAnswer: "width"
  },
  {
    id: "dca_q271",
    question: "Which term describes automatic scaling of cloud resources?",
    options: ["Auto-scaling", "Over-provisioning", "Under-provisioning", "Static scaling"],
    correctAnswer: "Auto-scaling"
  },
  {
    id: "dca_q272",
    question: "Which of these tools is used for network packet capture (example)?",
    options: ["Wireshark", "Notepad", "Paint", "Calculator"],
    correctAnswer: "Wireshark"
  },
  {
    id: "dca_q273",
    question: "Which HTML tag makes text bold semantically (escaped)?",
    options: ["&lt;strong&gt;", "&lt;b&gt;", "&lt;em&gt;", "&lt;i&gt;"],
    correctAnswer: "&lt;strong&gt;"
  },
  {
    id: "dca_q274",
    question: "Which SQL clause sorts the result set?",
    options: ["ORDER BY", "GROUP BY", "WHERE", "HAVING"],
    correctAnswer: "ORDER BY"
  },
  {
    id: "dca_q275",
    question: "Which C keyword stops a loop immediately?",
    options: ["break", "continue", "return", "exit"],
    correctAnswer: "break"
  },
  {
    id: "dca_q276",
    question: "Which HTML element groups form controls (escaped)?",
    options: ["&lt;fieldset&gt;", "&lt;form&gt;", "&lt;div&gt;", "&lt;section&gt;"],
    correctAnswer: "&lt;fieldset&gt;"
  },
  {
    id: "dca_q277",
    question: "Which of the following is used to prevent SQL injection?",
    options: ["Prepared statements", "String concatenation", "Allow user input directly", "Disable logs"],
    correctAnswer: "Prepared statements"
  },
  {
    id: "dca_q278",
    question: "Which of these is the standard port for HTTPS?",
    options: ["443", "80", "21", "25"],
    correctAnswer: "443"
  },
  {
    id: "dca_q279",
    question: "Which HTML attribute sets an image's alternate text (escaped)?",
    options: ["alt", "title", "src", "href"],
    correctAnswer: "alt"
  },
  {
    id: "dca_q280",
    question: "Which Windows feature shows system performance graphs and running apps?",
    options: ["Task Manager", "Disk Management", "Event Viewer", "Registry Editor"],
    correctAnswer: "Task Manager"
  },
  {
    id: "dca_q281",
    question: "Which data structure provides O(1) average time complexity for insert and lookup (hash-based)?",
    options: ["Hash table", "Binary tree", "Linked list", "Queue"],
    correctAnswer: "Hash table"
  },
  {
    id: "dca_q282",
    question: "Which HTML element specifies a navigation section (escaped)?",
    options: ["&lt;nav&gt;", "&lt;aside&gt;", "&lt;header&gt;", "&lt;footer&gt;"],
    correctAnswer: "&lt;nav&gt;"
  },
  {
    id: "dca_q283",
    question: "Which of these commands shows disk usage summary on Linux?",
    options: ["du -sh", "df -h", "ls -l", "mount"],
    correctAnswer: "du -sh"
  },
  {
    id: "dca_q284",
    question: "Which CSS shorthand sets margin for all sides?",
    options: ["margin: 10px;", "margin-left: 10px;", "margin-top: 10px;", "margin-right: 10px;"],
    correctAnswer: "margin: 10px;"
  },
  {
    id: "dca_q285",
    question: "Which SQL construct is used to enforce referential integrity between tables?",
    options: ["FOREIGN KEY", "PRIMARY KEY", "UNIQUE", "CHECK"],
    correctAnswer: "FOREIGN KEY"
  },
  {
    id: "dca_q286",
    question: "Which HTML element defines the main content area (escaped)?",
    options: ["&lt;main&gt;", "&lt;article&gt;", "&lt;section&gt;", "&lt;div&gt;"],
    correctAnswer: "&lt;main&gt;"
  },
  {
    id: "dca_q287",
    question: "Which of the following best describes a RESTful API?",
    options: ["Uses HTTP verbs and stateless requests", "Requires stateful server sessions", "Uses FTP protocol", "Is only for SOAP services"],
    correctAnswer: "Uses HTTP verbs and stateless requests"
  },
  {
    id: "dca_q288",
    question: "Which function in C returns the absolute value of an integer (math.h)?",
    options: ["abs()", "fabs()", "sqrt()", "pow()"],
    correctAnswer: "abs()"
  },
  {
    id: "dca_q289",
    question: "Which HTML element defines navigation links for screen readers (escaped)?",
    options: ["&lt;nav&gt;", "&lt;div&gt;", "&lt;span&gt;", "&lt;main&gt;"],
    correctAnswer: "&lt;nav&gt;"
  },
  {
    id: "dca_q290",
    question: "Which of these is used for remote version control hosting (example)?",
    options: ["GitHub", "Notepad", "Paint", "Calculator"],
    correctAnswer: "GitHub"
  },
  {
    id: "dca_q291",
    question: "Which CSS property specifies how text should wrap inside an element?",
    options: ["word-wrap / overflow-wrap", "text-wrap", "wrap", "line-wrap"],
    correctAnswer: "word-wrap / overflow-wrap"
  },
  {
    id: "dca_q292",
    question: "Which of these is a common hashing algorithm for integrity (not for passwords)?",
    options: ["SHA-256", "MD5", "bcrypt", "PBKDF2"],
    correctAnswer: "SHA-256"
  },
  {
    id: "dca_q293",
    question: "Which HTML attribute specifies an input's maximum length (escaped)?",
    options: ["maxlength", "max", "limit", "size"],
    correctAnswer: "maxlength"
  },
  {
    id: "dca_q294",
    question: "Which SQL operation merges rows from two tables based on a related column?",
    options: ["JOIN", "UNION", "INTERSECT", "EXCEPT"],
    correctAnswer: "JOIN"
  },
  {
    id: "dca_q295",
    question: "Which of the following is used to protect sensitive configuration in web apps?",
    options: ["Environment variables", "Hard-coded secrets", "Public repo", "Temp files"],
    correctAnswer: "Environment variables"
  },
  {
    id: "dca_q296",
    question: "Which HTML element represents a thematic grouping of content (escaped)?",
    options: ["&lt;section&gt;", "&lt;div&gt;", "&lt;article&gt;", "&lt;aside&gt;"],
    correctAnswer: "&lt;section&gt;"
  },
  {
    id: "dca_q297",
    question: "Which command in Linux displays free memory (human-readable)?",
    options: ["free -h", "mem -h", "top -m", "vmstat -h"],
    correctAnswer: "free -h"
  },
  {
    id: "dca_q298",
    question: "Which SQL function returns the total sum of a numeric column?",
    options: ["SUM()", "AVG()", "COUNT()", "MAX()"],
    correctAnswer: "SUM()"
  },
  {
    id: "dca_q299",
    question: "Which HTML tag indicates a paragraph (escaped)?",
    options: ["&lt;p&gt;", "&lt;div&gt;", "&lt;span&gt;", "&lt;section&gt;"],
    correctAnswer: "&lt;p&gt;"
  },
  {
    id: "dca_q300",
    question: "Which of the following is a CLI text editor on Linux?",
    options: ["vim", "Notepad", "WordPad", "Paint"],
    correctAnswer: "vim"
  },
  {
    id: "dca_q301",
    question: "Which HTML element is used to include inline CSS styles (escaped)?",
    options: ["&lt;style&gt;", "&lt;script&gt;", "&lt;link&gt;", "&lt;css&gt;"],
    correctAnswer: "&lt;style&gt;"
  },
  {
    id: "dca_q302",
    question: "Which HTTP method is idempotent and retrieves data?",
    options: ["GET", "POST", "PATCH", "CONNECT"],
    correctAnswer: "GET"
  },
  {
    id: "dca_q303",
    question: "Which of the following is a binary search requirement?",
    options: ["Sorted array", "Unsorted array", "Linked list only", "Hash table"],
    correctAnswer: "Sorted array"
  },
  {
    id: "dca_q304",
    question: "Which HTML attribute provides an element's id (escaped)?",
    options: ["id", "class", "name", "type"],
    correctAnswer: "id"
  },
  {
    id: "dca_q305",
    question: "Which of these HTTP headers aids CORS (Cross-Origin Resource Sharing)?",
    options: ["Access-Control-Allow-Origin", "Content-Type", "User-Agent", "Host"],
    correctAnswer: "Access-Control-Allow-Origin"
  },
  {
    id: "dca_q306",
    question: "Which algorithm uses a pivot to partition elements (average O(n log n))?",
    options: ["Quick Sort", "Bubble Sort", "Selection Sort", "Insertion Sort"],
    correctAnswer: "Quick Sort"
  },
  {
    id: "dca_q307",
    question: "Which HTML element is used to present a list of options in a form (escaped)?",
    options: ["&lt;select&gt;", "&lt;input type=\"radio\"&gt;", "&lt;textarea&gt;", "&lt;option&gt;"],
    correctAnswer: "&lt;select&gt;"
  },
  {
    id: "dca_q308",
    question: "Which database object enforces rules when data is changed?",
    options: ["Trigger", "View", "Sequence", "Schema"],
    correctAnswer: "Trigger"
  },
  {
    id: "dca_q309",
    question: "Which of these is a method to prevent Cross-Site Scripting (XSS)?",
    options: ["Output encoding", "Disable HTTPS", "Use eval on user input", "Store raw HTML in DB and render directly"],
    correctAnswer: "Output encoding"
  },
  {
    id: "dca_q310",
    question: "Which tag is used to create a horizontal rule (escaped)?",
    options: ["&lt;hr&gt;", "&lt;br&gt;", "&lt;line&gt;", "&lt;rule&gt;"],
    correctAnswer: "&lt;hr&gt;"
  },
  {
    id: "dca_q311",
    question: "Which of the following is a unit test framework for C (example)?",
    options: ["CUnit", "JUnit", "PyTest", "RSpec"],
    correctAnswer: "CUnit"
  },
  {
    id: "dca_q312",
    question: "Which HTML element defines emphasized text (escaped)?",
    options: ["&lt;em&gt;", "&lt;i&gt;", "&lt;strong&gt;", "&lt;b&gt;"],
    correctAnswer: "&lt;em&gt;"
  },
  {
    id: "dca_q313",
    question: "Which of these is a database normalization normal form that removes partial dependencies?",
    options: ["2NF", "1NF", "3NF", "BCNF"],
    correctAnswer: "2NF"
  },
  {
    id: "dca_q314",
    question: "Which SQL keyword restricts query results to unique entries?",
    options: ["DISTINCT", "ALL", "UNIQUE", "SINGLE"],
    correctAnswer: "DISTINCT"
  },
  {
    id: "dca_q315",
    question: "Which HTML attribute declares the language of an element (escaped)?",
    options: ["lang", "type", "charset", "href"],
    correctAnswer: "lang"
  },
  {
    id: "dca_q316",
    question: "Which of these is a common build tool for JavaScript projects?",
    options: ["webpack", "gcc", "javac", "make"],
    correctAnswer: "webpack"
  },
  {
    id: "dca_q317",
    question: "Which HTML element is used to mark up quoted text (escaped)?",
    options: ["&lt;blockquote&gt;", "&lt;q&gt;", "&lt;cite&gt;", "&lt;quote&gt;"],
    correctAnswer: "&lt;blockquote&gt;"
  },
  {
    id: "dca_q318",
    question: "Which of these is a protocol to synchronize time across systems?",
    options: ["NTP", "DNS", "DHCP", "FTP"],
    correctAnswer: "NTP"
  },
  {
    id: "dca_q319",
    question: "Which SQL function returns number of non-null values?",
    options: ["COUNT(column)", "COUNT(*)", "SUM()", "AVG()"],
    correctAnswer: "COUNT(column)"
  },
  {
    id: "dca_q320",
    question: "Which HTML element defines a section for contact info semantically (escaped)?",
    options: ["&lt;address&gt;", "&lt;contact&gt;", "&lt;footer&gt;", "&lt;aside&gt;"],
    correctAnswer: "&lt;address&gt;"
  },
  {
    id: "dca_q321",
    question: "Which Linux command shows the last lines of a file?",
    options: ["tail", "head", "less", "more"],
    correctAnswer: "tail"
  },
  {
    id: "dca_q322",
    question: "Which CSS property controls the spacing between letters?",
    options: ["letter-spacing", "line-height", "word-spacing", "text-indent"],
    correctAnswer: "letter-spacing"
  },
  {
    id: "dca_q323",
    question: "Which of these is used to persist sessions in web applications server-side?",
    options: ["Server-side sessions / DB backed sessions", "LocalStorage only", "Static files only", "Client cookies without server validation"],
    correctAnswer: "Server-side sessions / DB backed sessions"
  },
  {
    id: "dca_q324",
    question: "Which HTML tag is used to define a caption for a table (escaped)?",
    options: ["&lt;caption&gt;", "&lt;title&gt;", "&lt;thead&gt;", "&lt;tfoot&gt;"],
    correctAnswer: "&lt;caption&gt;"
  },
  {
    id: "dca_q325",
    question: "Which algorithm traverses a graph breadth-first?",
    options: ["Breadth-First Search (BFS)", "Depth-First Search (DFS)", "Dijkstra", "Prim"],
    correctAnswer: "Breadth-First Search (BFS)"
  },
  {
    id: "dca_q326",
    question: "Which SQL command modifies table structure (e.g., add column)?",
    options: ["ALTER TABLE", "UPDATE TABLE", "CHANGE TABLE", "MODIFY TABLE"],
    correctAnswer: "ALTER TABLE"
  },
  {
    id: "dca_q327",
    question: "Which HTML tag represents a self-contained composition that could be syndicated (escaped)?",
    options: ["&lt;article&gt;", "&lt;section&gt;", "&lt;div&gt;", "&lt;aside&gt;"],
    correctAnswer: "&lt;article&gt;"
  },
  {
    id: "dca_q328",
    question: "Which of these is a JavaScript runtime commonly used for server-side code?",
    options: ["Node.js", "Deno", "Both A and B", "None of the above"],
    correctAnswer: "Both A and B"
  },
  {
    id: "dca_q329",
    question: "Which HTML element embeds audio (escaped)?",
    options: ["&lt;audio&gt;", "&lt;sound&gt;", "&lt;media&gt;", "&lt;music&gt;"],
    correctAnswer: "&lt;audio&gt;"
  },
  {
    id: "dca_q330",
    question: "Which HTTP header indicates the media type of the returned content?",
    options: ["Content-Type", "Host", "User-Agent", "Accept"],
    correctAnswer: "Content-Type"
  },
  {
    id: "dca_q331",
    question: "Which of these database operations should be performed inside transactions for safety?",
    options: ["Multiple related INSERT/UPDATE/DELETE operations", "Single SELECT", "Static HTML serving", "CSS only changes"],
    correctAnswer: "Multiple related INSERT/UPDATE/DELETE operations"
  },
  {
    id: "dca_q332",
    question: "Which HTML tag defines a definition list (escaped)?",
    options: ["&lt;dl&gt;", "&lt;ul&gt;", "&lt;ol&gt;", "&lt;li&gt;"],
    correctAnswer: "&lt;dl&gt;"
  },
  {
    id: "dca_q333",
    question: "Which Linux command shows running processes interactively?",
    options: ["top", "ls", "pwd", "cat"],
    correctAnswer: "top"
  },
  {
    id: "dca_q334",
    question: "Which CSS property controls whether an element is visible or removed from layout?",
    options: ["display", "visibility", "opacity", "z-index"],
    correctAnswer: "display"
  },
  {
    id: "dca_q335",
    question: "Which type of SQL join returns rows when there is a match in both tables?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
    correctAnswer: "INNER JOIN"
  },
  {
    id: "dca_q336",
    question: "Which HTML attribute links a label to an input (escaped)?",
    options: ["for", "id", "name", "type"],
    correctAnswer: "for"
  },
  {
    id: "dca_q337",
    question: "Which of these is a testing methodology focusing on small units of code?",
    options: ["Unit testing", "Integration testing", "System testing", "Acceptance testing"],
    correctAnswer: "Unit testing"
  },
  {
    id: "dca_q338",
    question: "Which CSS selector selects elements with class 'active'?",
    options: [".active", "#active", "active", "*active"],
    correctAnswer: ".active"
  },
  {
    id: "dca_q339",
    question: "Which HTML element defines a description term (escaped)?",
    options: ["&lt;dt&gt;", "&lt;dd&gt;", "&lt;dl&gt;", "&lt;li&gt;"],
    correctAnswer: "&lt;dt&gt;"
  },
  {
    id: "dca_q340",
    question: "Which of these is used to manage Python project dependencies?",
    options: ["virtualenv / venv", "npm", "composer", "gem"],
    correctAnswer: "virtualenv / venv"
  },
  {
    id: "dca_q341",
    question: "Which of these CSS units is relative to the font-size of the element?",
    options: ["em", "px", "cm", "in"],
    correctAnswer: "em"
  },
  {
    id: "dca_q342",
    question: "Which HTML attribute specifies the character encoding for the document (escaped)?",
    options: ["charset", "lang", "type", "content"],
    correctAnswer: "charset"
  },
  {
    id: "dca_q343",
    question: "Which SQL statement removes a table completely?",
    options: ["DROP TABLE", "TRUNCATE TABLE", "DELETE FROM", "ALTER TABLE"],
    correctAnswer: "DROP TABLE"
  },
  {
    id: "dca_q344",
    question: "Which of the following best describes 'responsive images' technique?",
    options: ["Serving appropriately sized images for varying screen sizes", "Serving one large image always", "Using GIF only", "Using BMP only"],
    correctAnswer: "Serving appropriately sized images for varying screen sizes"
  },
  {
    id: "dca_q345",
    question: "Which HTML tag embeds another web page within a page (escaped)?",
    options: ["&lt;iframe&gt;", "&lt;embed&gt;", "&lt;object&gt;", "&lt;frame&gt;"],
    correctAnswer: "&lt;iframe&gt;"
  },
  {
    id: "dca_q346",
    question: "Which algorithm finds minimum spanning tree of a graph (example)?",
    options: ["Kruskal's or Prim's", "Dijkstra's", "Bellman-Ford", "Binary Search"],
    correctAnswer: "Kruskal's or Prim's"
  },
  {
    id: "dca_q347",
    question: "Which HTML attribute used in &lt;img&gt; provides image source (escaped)?",
    options: ["src", "href", "alt", "title"],
    correctAnswer: "src"
  },
  {
    id: "dca_q348",
    question: "Which concept refers to separating content (HTML), presentation (CSS) and behavior (JS)?",
    options: ["Separation of concerns", "Monolithic coding", "Inline everything", "Server rendering only"],
    correctAnswer: "Separation of concerns"
  },
  {
    id: "dca_q349",
    question: "Which SQL keyword prevents duplicate rows in a SELECT with UNION by default?",
    options: ["UNION (removes duplicates)", "UNION ALL (keeps duplicates)", "JOIN", "INTERSECT"],
    correctAnswer: "UNION (removes duplicates)"
  },
  {
    id: "dca_q350",
    question: "Which HTML tag inserts a line break (escaped)?",
    options: ["&lt;br&gt;", "&lt;hr&gt;", "&lt;lb&gt;", "&lt;break&gt;"],
    correctAnswer: "&lt;br&gt;"
  },
  {
    id: "dca_q351",
    question: "Which CSS pseudo-class applies when the user hovers over an element?",
    options: [":hover", ":active", ":focus", ":visited"],
    correctAnswer: ":hover"
  },
  {
    id: "dca_q352",
    question: "Which of these is a method to make web APIs idempotent?",
    options: ["Use PUT for updates and proper checks", "Use POST for everything", "Disable caching", "Always recreate resources"],
    correctAnswer: "Use PUT for updates and proper checks"
  },
  {
    id: "dca_q353",
    question: "Which HTML tag represents a generic inline container (escaped)?",
    options: ["&lt;span&gt;", "&lt;div&gt;", "&lt;p&gt;", "&lt;section&gt;"],
    correctAnswer: "&lt;span&gt;"
  },
  {
    id: "dca_q354",
    question: "Which CSS property controls stacking order of positioned elements?",
    options: ["z-index", "order", "stack", "layer"],
    correctAnswer: "z-index"
  },
  {
    id: "dca_q355",
    question: "Which SQL clause filters results before grouping?",
    options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
    correctAnswer: "WHERE"
  },
  {
    id: "dca_q356",
    question: "Which HTML element references an external script file (escaped)?",
    options: ["&lt;script src=\"app.js\"&gt;&lt;/script&gt;", "&lt;link href=\"app.js\"&gt;", "&lt;style src=\"app.js\"&gt;", "&lt;js src=\"app.js\"&gt;"],
    correctAnswer: "&lt;script src=\"app.js\"&gt;&lt;/script&gt;"
  },
  {
    id: "dca_q357",
    question: "Which of these is a common method to secure REST APIs?",
    options: ["Use token-based authentication (e.g., JWT) and HTTPS", "Use HTTP only", "Allow cross-site requests without checks", "Store secrets in client JS"],
    correctAnswer: "Use token-based authentication (e.g., JWT) and HTTPS"
  },
  {
    id: "dca_q358",
    question: "Which HTML element indicates a small side content (escaped)?",
    options: ["&lt;aside&gt;", "&lt;section&gt;", "&lt;main&gt;", "&lt;footer&gt;"],
    correctAnswer: "&lt;aside&gt;"
  },
  {
    id: "dca_q359",
    question: "Which command removes a file in Linux?",
    options: ["rm filename", "del filename", "erase filename", "remove filename"],
    correctAnswer: "rm filename"
  },
  {
    id: "dca_q360",
    question: "Which CSS property changes the font family?",
    options: ["font-family", "font-style", "font-weight", "font-size"],
    correctAnswer: "font-family"
  },
  {
    id: "dca_q361",
    question: "Which HTML tag represents a caption for a figure (escaped)?",
    options: ["&lt;figcaption&gt;", "&lt;caption&gt;", "&lt;title&gt;", "&lt;header&gt;"],
    correctAnswer: "&lt;figcaption&gt;"
  },
  {
    id: "dca_q362",
    question: "Which of the following is a client-side MVC-ish library (example)?",
    options: ["React", "MySQL", "PostgreSQL", "SQLite"],
    correctAnswer: "React"
  },
  {
    id: "dca_q363",
    question: "Which SQL function returns the rounded value of a number?",
    options: ["ROUND()", "TRUNC()", "FLOOR()", "CEIL()"],
    correctAnswer: "ROUND()"
  },
  {
    id: "dca_q364",
    question: "Which HTML attribute lets you open a link in new tab (escaped)?",
    options: ["target=\"_blank\"", "rel=\"nofollow\"", "type=\"new\"", "open=\"true\""],
    correctAnswer: "target=\"_blank\""
  },
  {
    id: "dca_q365",
    question: "Which of these is used to inspect and debug JavaScript in browser?",
    options: ["Developer Tools (Console)", "Notepad", "Paint", "Calculator"],
    correctAnswer: "Developer Tools (Console)"
  },
  {
    id: "dca_q366",
    question: "Which SQL clause limits rows returned by a query (MySQL/Postgres)?",
    options: ["LIMIT", "OFFSET", "FETCH", "TOP"],
    correctAnswer: "LIMIT"
  },
  {
    id: "dca_q367",
    question: "Which HTML element groups form labels and controls (escaped)?",
    options: ["&lt;label&gt;", "&lt;field&gt;", "&lt;input&gt;", "&lt;control&gt;"],
    correctAnswer: "&lt;label&gt;"
  },
  {
    id: "dca_q368",
    question: "Which of the following is used to manage dependencies for Java (example)?",
    options: ["Maven", "npm", "pip", "composer"],
    correctAnswer: "Maven"
  },
  {
    id: "dca_q369",
    question: "Which HTTP status code indicates redirection (Moved Permanently)?",
    options: ["301", "200", "404", "500"],
    correctAnswer: "301"
  },
  {
    id: "dca_q370",
    question: "Which HTML attribute preloads images or resources (escaped)?",
    options: ["rel=\"preload\"", "preload", "load", "async"],
    correctAnswer: "rel=\"preload\""
  },
  {
    id: "dca_q371",
    question: "Which CSS property sets element's background color?",
    options: ["background-color", "bg", "color", "fill"],
    correctAnswer: "background-color"
  },
  {
    id: "dca_q372",
    question: "Which of these is a common JavaScript package manager besides npm?",
    options: ["yarn", "pip", "gem", "composer"],
    correctAnswer: "yarn"
  },
  {
    id: "dca_q373",
    question: "Which HTML element indicates important text (escaped)?",
    options: ["&lt;strong&gt;", "&lt;em&gt;", "&lt;b&gt;", "&lt;i&gt;"],
    correctAnswer: "&lt;strong&gt;"
  },
  {
    id: "dca_q374",
    question: "Which of these is used to create responsive breakpoints in CSS?",
    options: ["@media queries", "inline styles", "meta tags only", "HTML comments"],
    correctAnswer: "@media queries"
  },
  {
    id: "dca_q375",
    question: "Which SQL clause is used to filter results after grouping?",
    options: ["HAVING", "WHERE", "GROUP BY", "ORDER BY"],
    correctAnswer: "HAVING"
  },
  {
    id: "dca_q376",
    question: "Which HTML5 API allows access to geolocation data (escaped)?",
    options: ["Geolocation API (navigator.geolocation)", "LocalStorage", "WebSockets", "IndexedDB"],
    correctAnswer: "Geolocation API (navigator.geolocation)"
  },
  {
    id: "dca_q377",
    question: "Which CSS method centers a block element horizontally with known width?",
    options: ["margin: 0 auto;", "text-align: center;", "display: inline;", "float: left;"],
    correctAnswer: "margin: 0 auto;"
  },
  {
    id: "dca_q378",
    question: "Which of these is a binary tree traversal order?",
    options: ["In-order", "Pre-order", "Post-order", "All of the above"],
    correctAnswer: "All of the above"
  },
  {
    id: "dca_q379",
    question: "Which HTML tag defines the document body content (escaped)?",
    options: ["&lt;body&gt;", "&lt;head&gt;", "&lt;meta&gt;", "&lt;link&gt;"],
    correctAnswer: "&lt;body&gt;"
  },
  {
    id: "dca_q380",
    question: "Which of the following improves web app security by setting cookies with this flag?",
    options: ["HttpOnly", "SameSite", "Secure", "All of the above"],
    correctAnswer: "All of the above"
  },
  {
    id: "dca_q381",
    question: "Which SQL construct creates an alias for a table or column?",
    options: ["AS", "ALIAS", "RENAME", "ASNAME"],
    correctAnswer: "AS"
  },
  {
    id: "dca_q382",
    question: "Which HTML element is intended to contain interactive controls for playback (escaped)?",
    options: ["&lt;audio&gt;", "&lt;video&gt;", "&lt;embed&gt;", "&lt;object&gt;"],
    correctAnswer: "&lt;audio&gt;"
  },
  {
    id: "dca_q383",
    question: "Which CSS layout module is two-dimensional and powerful for grid layouts?",
    options: ["CSS Grid", "Flexbox", "Tables", "Float"],
    correctAnswer: "CSS Grid"
  },
  {
    id: "dca_q384",
    question: "Which of the following is used to run background tasks in Linux (example)?",
    options: ["cron", "schtasks", "at", "taskmgr"],
    correctAnswer: "cron"
  },
  {
    id: "dca_q385",
    question: "Which HTML element indicates an embedded external resource (escaped)?",
    options: ["&lt;embed&gt;", "&lt;link&gt;", "&lt;object&gt;", "&lt;iframe&gt;"],
    correctAnswer: "&lt;embed&gt;"
  },
  {
    id: "dca_q386",
    question: "Which SQL feature allows pagination in results (MySQL)?",
    options: ["LIMIT offset, count", "TOP", "ROWNUM", "FETCH NEXT"],
    correctAnswer: "LIMIT offset, count"
  },
  {
    id: "dca_q387",
    question: "Which of these is a commonly used linter for JavaScript code?",
    options: ["ESLint", "Pylint", "Rubocop", "JSLint (older)"],
    correctAnswer: "ESLint"
  },
  {
    id: "dca_q388",
    question: "Which HTML element defines a definition description (escaped)?",
    options: ["&lt;dd&gt;", "&lt;dt&gt;", "&lt;dl&gt;", "&lt;li&gt;"],
    correctAnswer: "&lt;dd&gt;"
  },
  {
    id: "dca_q389",
    question: "Which CSS property makes an element appear on top of others when positioned?",
    options: ["z-index", "top", "left", "position"],
    correctAnswer: "z-index"
  },
  {
    id: "dca_q390",
    question: "Which HTML attribute indicates a checkbox is checked by default (escaped)?",
    options: ["checked", "selected", "default", "value"],
    correctAnswer: "checked"
  },
  {
    id: "dca_q391",
    question: "Which SQL operator tests for NULL values?",
    options: ["IS NULL", "=", "IS NOT NULL", "NONE"],
    correctAnswer: "IS NULL"
  },
  {
    id: "dca_q392",
    question: "Which HTML tag links to a favicon (escaped)?",
    options: ["&lt;link rel=\"icon\" href=\"favicon.ico\"&gt;", "&lt;meta name=\"icon\"&gt;", "&lt;img rel=\"icon\"&gt;", "&lt;script rel=\"icon\"&gt;"],
    correctAnswer: "&lt;link rel=\"icon\" href=\"favicon.ico\"&gt;"
  },
  {
    id: "dca_q393",
    question: "Which CSS property controls the space inside an element around its content?",
    options: ["padding", "margin", "border", "gap"],
    correctAnswer: "padding"
  },
  {
    id: "dca_q394",
    question: "Which HTML element defines navigation landmark for accessibility (escaped)?",
    options: ["&lt;nav&gt;", "&lt;header&gt;", "&lt;main&gt;", "&lt;footer&gt;"],
    correctAnswer: "&lt;nav&gt;"
  },
  {
    id: "dca_q395",
    question: "Which of these tools helps automate browser actions for testing?",
    options: ["Selenium", "Postman", "Wireshark", "GIMP"],
    correctAnswer: "Selenium"
  },
  {
    id: "dca_q396",
    question: "Which HTML attribute instructs browsers not to index a page (escaped)?",
    options: ["meta name=\"robots\" content=\"noindex\"", "rel=\"nofollow\"", "charset", "content"],
    correctAnswer: "meta name=\"robots\" content=\"noindex\""
  },
  {
    id: "dca_q397",
    question: "Which SQL construct allows conditional logic in queries (example)?",
    options: ["CASE WHEN ... THEN ... END", "IF ... THEN", "SWITCH ...", "LOOP ..."],
    correctAnswer: "CASE WHEN ... THEN ... END"
  },
  {
    id: "dca_q398",
    question: "Which CSS unit is relative to the root element's font size (recommended for scalable layouts)?",
    options: ["rem", "px", "cm", "pt"],
    correctAnswer: "rem"
  },
  {
    id: "dca_q399",
    question: "Which HTML element is used to show a progress bar (escaped)?",
    options: ["&lt;progress&gt;", "&lt;meter&gt;", "&lt;bar&gt;", "&lt;status&gt;"],
    correctAnswer: "&lt;progress&gt;"
  },
  {
    id: "dca_q400",
    question: "Which best practice reduces load time by combining many small files into fewer files?",
    options: ["Bundling", "Splitting", "Inlining everything", "Serving unminified assets"],
    correctAnswer: "Bundling"
  }
]

,
    'cpp': [],
    'html': [],
    'css': []
};

// Merge into existing bank if present
window.questionBank = window.questionBank || {};
Object.keys(DEFAULT_QUESTION_BANK).forEach(cat => {
    if (!Array.isArray(window.questionBank[cat]) || window.questionBank[cat].length === 0) {
        // only assign default if category missing or empty
        window.questionBank[cat] = DEFAULT_QUESTION_BANK[cat].slice();
    } else {
        // keep existing items, but ensure IDs exist
        window.questionBank[cat] = window.questionBank[cat].map((q, idx) => ({ id: q.id || `${cat}_q${idx+1}`, ...q }));
    }
});

// Helper: safe getter
window.getRandomQuestions = function(category, count = 10) {
    const arr = Array.isArray(window.questionBank[category]) ? window.questionBank[category].slice() : [];
    // shuffle
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, Math.min(count, arr.length));
};
