---
title: "Inventory Management"
body: "This is a program developed in C# using Windows Forms**, designed to connect to a database and offer key functionalities such as report generation, item stock queries, and visualization of brands and categories."
plenguage: "C# , .NET Framework and MySQL"
href: ""
img: ""
github: "https://github.com/ORYEPA/Almacen_Forms"
---

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inventory Management and Reports</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        h1, h2 {
            color: #2c3e50;
        }
        pre {
            background-color: #f4f4f4;
            padding: 10px;
            display: block;
            overflow-x: auto;
        }
        ul {
            padding-left: 20px;
        }
    </style>
</head>
<body>

    <h1>Inventory Management and Reports</h1>

    <p>This is a program developed in <strong>C# using Windows Forms</strong>, designed to connect to a database and offer key functionalities such as report generation, item stock queries, and visualization of brands and categories.</p>

    <h2>Features</h2>
    <ul>
        <li><strong>Stock Management:</strong> Real-time queries of item availability.</li>
        <li><strong>Advanced Classification:</strong> View items organized by brands and categories.</li>
        <li><strong>Report Generation:</strong> Create customizable and exportable reports.</li>
        <li><strong>Intuitive Interface:</strong> Built on Windows Forms, with controls like DataGridView for a user-friendly experience.</li>
    </ul>

    <h2>Technologies Used</h2>
    <ul>
        <li><strong>Language:</strong> C#</li>
        <li><strong>Framework:</strong> .NET Framework</li>
        <li><strong>Database:</strong> SQL Server</li>
        <li><strong>Additional Libraries:</strong>
            <ul>
                <li>ADO.NET for database interaction.</li>
                <li>[Optional] Crystal Reports or Report Viewer for report generation.</li>
            </ul>
        </li>
    </ul>

    <h2>Database Structure</h2>
    <p>The program uses a well-structured database with the following main tables:</p>
    <ul>
        <li><strong>Items:</strong> Contains basic product information.</li>
        <li><strong>Stock:</strong> Records available quantities.</li>
        <li><strong>Brands:</strong> Stores the different brands associated with items.</li>
        <li><strong>Categories:</strong> Classifies items by type or category.</li>
    </ul>

    <h2>Installation</h2>

    <p>1. <strong>Clone the Repository:</strong></p>
    <pre><code>git clone https://github.com/ORYEPA/Almacen_Forms.git
cd inventory-management</code></pre>

    <p>2. <strong>Set Up the Database:</strong></p>
   

    <p>3. <strong>Build the Project:</strong></p>
    <p>Open the <strong>.sln</strong> file in Visual Studio and build the solution.</p>

    <p>4. <strong>Run the Application:</strong></p>
    <p>Start the program from Visual Studio or execute the <strong>.exe</strong> file located in the <strong>bin</strong> folder.</p>

    <h2>Usage</h2>
    <ul>
        <li><strong>Stock Queries:</strong> Filter items by brand or category and check current availability.</li>
        <li><strong>Report Generation:</strong> Access the reports section, select desired filters, and generate a report in PDF or Excel format.</li>
    </ul>

</body>


