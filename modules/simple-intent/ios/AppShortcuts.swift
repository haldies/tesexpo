import AppIntents

@available(iOS 16.0, *)
struct SimpleShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: SimpleIntent(),
            phrases: [
                "Tambah tugas \(.name) di \(.applicationName)",
                "Catat tugas di \(.applicationName)",
                "Tambah kerjaan \(.name) ke \(.applicationName)"
            ],
            shortTitle: "Tambah To-Do",
            systemImageName: "checklist"
        )
    }
}
