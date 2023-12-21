include 'connect.php';

function getTasks() {
    global $conn;
    $sql = "SELECT * FROM tasks";
    $result = $conn->query($sql);
    return $result;
}

header('Content-Type: application/json');
echo json_encode(getTasks()->fetch_all(MYSQLI_ASSOC));
function addTask($title) {
    global $conn;
    $sql = "INSERT INTO tasks (title) VALUES (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $title);
    $stmt->execute();
}
function updateTask($id, $completed) {
    global $conn;
    $sql = "UPDATE tasks SET completed = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $completed, $id);
    $stmt->execute();
}
function deleteTask($id) {
    global $conn;
    $sql = "DELETE FROM tasks WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
}
