import subprocess
import sys
import platform
import threading
import time
import os

def run_command(command):
    """Run a shell command and return the Popen process.

    We run commands with `shell=True` so npm scripts can resolve local
    binaries (./node_modules/.bin) on all platforms.
    `command` should be a string like "npm run dev".
    """
    try:
        process = subprocess.Popen(command, shell=True)
        return process
    except Exception as e:
        print(f"Xatolik: {command} ni ishga tushirib bo'lmadi: {e}")
        return None


def ensure_node_dependencies():
    """If `node_modules` is missing, run `npm install` automatically."""
    if not os.path.isdir("node_modules"):
        print("node_modules topilmadi — paketlar o'rnatilmoqda (npm install)...")
        proc = run_command("npm install --legacy-peer-deps --no-audit")
        if proc:
            proc.wait()
        else:
            print("npm install bajarilmadi. Iltimos, `npm install` ni qo'lda bajaring.")

def main():
    print("=== Young Adults Education Center - To'liq Tizimni Ishga Tushirish ===")
    # ensure node deps are installed so local binaries (vite, tsx) exist
    ensure_node_dependencies()

    # 1. Adminni initsializatsiya qilish
    print("\n[1/3] Admin foydalanuvchisini tekshirilmoqda...")
    init_proc = run_command("npm run init-admin")
    if init_proc:
        init_proc.wait()
    
    # 2. Backend Serverni ishga tushirish
    print("\n[2/3] Backend server ishga tushirilmoqda (Port: 5000)...")
    server_proc = run_command("npm run server")
    
    # 3. Frontendni (Vite) ishga tushirish
    print("\n[3/3] Frontend ishga tushirilmoqda...")
    frontend_proc = run_command("npm run dev")
    
    print("\n---------------------------------------------------------")
    print("Loyiha muvaffaqiyatli ishga tushdi!")
    print("Frontend: http://localhost:3000")
    print("Admin Panel: http://localhost:3000/admin")
    print("Backend API: http://localhost:5000")
    print("Admin Login: admin")
    print("Admin Parol: adminpassword123")
    print("---------------------------------------------------------")
    print("To'xtatish uchun Ctrl+C ni bosing.")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nLoyiha to'xtatilmoqda...")
        if server_proc: server_proc.terminate()
        if frontend_proc: frontend_proc.terminate()
        print("Barcha jarayonlar to'xtatildi.")

if __name__ == "__main__":
    main()