import AppIntents

struct SimpleShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: SimpleIntent(),
            phrases: [
                "Tambah tugas \(.task) di \(.applicationName)",
                "Catat tugas di \(.applicationName)",
                "Tambah kerjaan \(.task) ke \(.applicationName)"
            ],
            shortTitle: "Tambah To-Do",
            systemImageName: "checklist"
        )
    }
}
