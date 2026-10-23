$c = Get-Content index.html -Raw

# Find the solutions section
$solStart = $c.IndexOf('data-solutions=')
$solSectionEnd = $c.IndexOf('</section>', $solStart)

# Get the exact ending pattern we need to replace
# It should be </a></div></div></section>
$endPattern = '</a></div></div></section>'
$endPos = $c.LastIndexOf($endPattern, $solSectionEnd + 10)
Write-Output "End pattern found at: $endPos"
Write-Output "Section end at: $solSectionEnd"

# Verify what's at that position
if ($endPos -ge 0) {
    $verify = $c.Substring($endPos, [Math]::Min(40, $c.Length - $endPos))
    Write-Output "At position: >>>$verify<<<"
}

# Find all occurrences of this pattern between solStart and solSectionEnd
$searchPos = $solStart
$count = 0
while ($true) {
    $found = $c.IndexOf($endPattern, $searchPos)
    if ($found -lt 0 -or $found -gt $solSectionEnd + 10) { break }
    $count++
    Write-Output "Occurrence $count at position: $found"
    $searchPos = $found + 1
}
