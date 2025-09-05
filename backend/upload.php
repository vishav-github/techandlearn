<?php
$targetDir = __DIR__ . '/../uploads/';
$targetFile = $targetDir . 'latest.xlsx';

if (!is_dir($targetDir)) mkdir($targetDir, 0777, true);

if (move_uploaded_file($_FILES['excelFile']['tmp_name'], $targetFile)) {
    echo "✅ File uploaded successfully.<br>";

    // Trigger Puppeteer sync
    $output = shell_exec("node ../syncRemote.js 2>&1");
    echo "<pre>$output</pre>";
} else {
    echo "❌ Upload failed.";
}
?>
