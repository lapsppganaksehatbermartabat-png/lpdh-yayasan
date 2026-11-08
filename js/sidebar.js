// =====================================================
// FILE: js/sidebar.js (PERBAIKAN URUTAN FUNGSI)
// =====================================================

window.renderSidebar = function () {
    const sidebarEl = document.getElementById('sidebar');

    if (!sidebarEl) {
        console.error('Elemen #sidebar tidak ditemukan.');
        return;
    }

    // 1. Ambil data user dari sessionStorage / localStorage
    let currentUser = {};
    try {
        currentUser = JSON.parse(
            sessionStorage.getItem('sppg_user') || localStorage.getItem('sppg_user') || '{}'
        );
    } catch (error) {
        console.error('Gagal membaca data user:', error);
    }

    // 2. Deklarasikan variabel identitas user
    const userJabatan = String(currentUser.jabatan || '').toLowerCase().trim();
    const userRole = String(currentUser.role_access || '').toLowerCase().trim();
    const userEmail = String(currentUser.username || currentUser.email || '').toLowerCase().trim();

    // 3. Evaluasi status Super User secara mutlak
    const isSuperUser =
        userJabatan.includes('super') ||
        userRole === 'superadmin' ||
        userRole === 'super_user' ||
        userRole === 'admin' ||
        userEmail === 'haaziqnawraalfatih@gmail.com';

    // Ambil hak akses menu dengan pengaman objek kosong
    const permissions = currentUser.menu_permissions || {};

    // 4. DEFINISIKAN FUNGSI getAccess DI ATAS SEBELUM DIPAKAI OLEH OBJEK acc
    function getAccess(menuKey) {
        if (isSuperUser) return 'edit';

        const access = permissions[menuKey];
        if (
            access === undefined ||
            access === null ||
            access === ''
        ) {
            return 'hidden';
        }

        return String(access).toLowerCase().trim();
    }

    // =================================================
    // STATUS AKSES MENU
    // =================================================

    const acc = {
        dashboard: getAccess('dashboard'),

        master_sppg: getAccess('master_sppg'),
        master_petugas: getAccess('master_petugas'),
        master_pm: getAccess('master_pm'),
        master_pic_sekolah: getAccess('master_pic_sekolah'),
        master_pic_posyandu: getAccess('master_pic_posyandu'),
        master_relawan: getAccess('master_relawan'),
        master_barang: getAccess('master_barang'),
        master_suplier: getAccess('master_suplier'),

        data_pm_on_going: getAccess('data_pm_on_going'),
        absen_relawan: getAccess('absen_relawan'),

        rab_bahan_baku: getAccess('rab_bahan_baku'),
        rab_operasional: getAccess('rab_operasional'),
        rab_insentif_sppg: getAccess('rab_insentif_sppg'),

        maker_bahan_baku: getAccess('maker_bahan_baku'),
        maker_operasional: getAccess('maker_operasional'),
        maker_relawan: getAccess('maker_relawan'),
        maker_pic_sekolah: getAccess('maker_pic_sekolah'),
        maker_pic_posyandu: getAccess('maker_pic_posyandu'),
        maker_insentif_sppg: getAccess('maker_insentif_sppg'),

        saldo_awal: getAccess('saldo_awal'),
        pemasukan: getAccess('pemasukan'),
        pengeluaran: getAccess('pengeluaran'),

        cetak_report: getAccess('cetak_report')
    };

    // =================================================
    // CEK KELOMPOK MENU (Bypass untuk Super User)
    // =================================================

    const showMaster = isSuperUser || (
        acc.master_sppg !== 'hidden' ||
        acc.master_petugas !== 'hidden' ||
        acc.master_pm !== 'hidden' ||
        acc.master_pic_sekolah !== 'hidden' ||
        acc.master_pic_posyandu !== 'hidden' ||
        acc.master_relawan !== 'hidden' ||
        acc.master_barang !== 'hidden' ||
        acc.master_suplier !== 'hidden'
    );

    const showRab = isSuperUser || (
        acc.rab_bahan_baku !== 'hidden' ||
        acc.rab_operasional !== 'hidden' ||
        acc.rab_insentif_sppg !== 'hidden'
    );

    const showMaker = isSuperUser || (
        acc.maker_bahan_baku !== 'hidden' ||
        acc.maker_operasional !== 'hidden' ||
        acc.maker_relawan !== 'hidden' ||
        acc.maker_pic_sekolah !== 'hidden' ||
        acc.maker_pic_posyandu !== 'hidden' ||
        acc.maker_insentif_sppg !== 'hidden'
    );

    const showKeuangan = isSuperUser || (
        acc.saldo_awal !== 'hidden' ||
        acc.pemasukan !== 'hidden' ||
        acc.pengeluaran !== 'hidden'
    );

    // =================================================
    // MEMBUAT SIDEBAR
    // =================================================

    sidebarEl.innerHTML = `
        <div class="sidebar-header d-flex justify-content-between align-items-center p-3">
            <h5 class="m-0 text-truncate fw-bold fs-6 text-dark">
                <i class="bi bi-layers-fill text-primary me-2"></i>
                <span>APP LPDH Yayasan</span>
            </h5>
        </div>

        <ul class="sidebar-menu list-unstyled px-2">

            <!-- DASHBOARD -->
            ${acc.dashboard !== 'hidden' ? `
                <li class="mb-1">
                    <a href="#" data-url="dashboard.html" class="d-flex align-items-center py-2 px-3 rounded text-decoration-none active">
                        <i class="bi bi-grid-1x2-fill"></i>
                        <span class="ms-2">Dashboard</span>
                    </a>
                </li>
            ` : ''}

            <!-- 1. DATA MASTER -->
            ${showMaster ? `
                <li class="mb-1">
                    <a class="nav-dropdown-toggle d-flex align-items-center justify-content-between py-2 px-3 rounded text-decoration-none"
                       data-bs-toggle="collapse"
                       href="#menuMaster"
                       role="button"
                       aria-expanded="false">
                        <div class="d-flex align-items-center">
                            <i class="bi bi-folder-fill"></i>
                            <span class="ms-2">Data Master</span>
                        </div>
                        <i class="bi bi-chevron-down toggle-icon small"></i>
                    </a>
                    <div class="collapse submenu-container ps-3" id="menuMaster">
                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small pt-1">
                            ${acc.master_sppg !== 'hidden' ? `<li class="mb-1"><a href="#" data-url="master_sppg.html" class="d-block py-1 px-2 text-decoration-none">Master SPPG</a></li>` : ''}
                            ${acc.master_petugas !== 'hidden' ? `<li class="mb-1"><a href="#" data-url="master_petugas.html" class="d-block py-1 px-2 text-decoration-none">Master Petugas</a></li>` : ''}
                            ${acc.master_pm !== 'hidden' ? `<li class="mb-1"><a href="#" data-url="master_pm.html" class="d-block py-1 px-2 text-decoration-none">Master PM</a></li>` : ''}
                            ${acc.master_pic_sekolah !== 'hidden' ? `<li class="mb-1"><a href="#" data-url="master_pic_sekolah.html" class="d-block py-1 px-2 text-decoration-none">Master PIC Sekolah</a></li>` : ''}
                            ${acc.master_pic_posyandu !== 'hidden' ? `<li class="mb-1"><a href="#" data-url="master_pic_posyandu.html" class="d-block py-1 px-2 text-decoration-none">Master PIC Posyandu</a></li>` : ''}
                            ${acc.master_relawan !== 'hidden' ? `<li class="mb-1"><a href="#" data-url="master_relawan.html" class="d-block py-1 px-2 text-decoration-none">Master Relawan</a></li>` : ''}
                            ${acc.master_barang !== 'hidden' ? `<li class="mb-1"><a href="#" data-url="master_barang.html" class="d-block py-1 px-2 text-decoration-none">Master Barang</a></li>` : ''}
                            ${acc.master_suplier !== 'hidden' ? `<li class="mb-1"><a href="#" data-url="master_suplier.html" class="d-block py-1 px-2 text-decoration-none">Master Suplier</a></li>` : ''}
                        </ul>
                    </div>
                </li>
            ` : ''}

            <!-- 2. DATA PM & PIC -->
            ${acc.data_pm_on_going !== 'hidden' ? `
                <li class="mb-1">
                    <a class="nav-dropdown-toggle d-flex align-items-center justify-content-between py-2 px-3 rounded text-decoration-none"
                       data-bs-toggle="collapse"
                       href="#menuPmPic"
                       role="button"
                       aria-expanded="false">
                        <div class="d-flex align-items-center">
                            <i class="bi bi-people-fill"></i>
                            <span class="ms-2">Data PM & PIC</span>
                        </div>
                        <i class="bi bi-chevron-down toggle-icon small"></i>
                    </a>
                    <div class="collapse submenu-container ps-3" id="menuPmPic">
                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small pt-1">
                            <li class="mb-1"><a href="#" data-url="data_pm_on_going.html" class="d-block py-1 px-2 text-decoration-none">Data PM On Going</a></li>
                        </ul>
                    </div>
                </li>
            ` : ''}

            <!-- 3. RELAWAN -->
            ${acc.absen_relawan !== 'hidden' ? `
                <li class="mb-1">
                    <a class="nav-dropdown-toggle d-flex align-items-center justify-content-between py-2 px-3 rounded text-decoration-none"
                       data-bs-toggle="collapse"
                       href="#menuRelawan"
                       role="button"
                       aria-expanded="false">
                        <div class="d-flex align-items-center">
                            <i class="bi bi-person-heart"></i>
                            <span class="ms-2">Relawan</span>
                        </div>
                        <i class="bi bi-chevron-down toggle-icon small"></i>
                    </a>
                    <div class="collapse submenu-container ps-3" id="menuRelawan">
                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small pt-1">
                            <li class="mb-1"><a href="#" data-url="absen_relawan.html" class="d-block py-1 px-2 text-decoration-none">Absen Relawan</a></li>
                        </ul>
                    </div>
                </li>
            ` : ''}

            <!-- 4. RAB -->
            ${showRab ? `
                <li class="mb-1">
                    <a class="nav-dropdown-toggle d-flex align-items-center justify-content-between py-2 px-3 rounded text-decoration-none"
                       data-bs-toggle="collapse"
                       href="#menuRab"
                       role="button"
                       aria-expanded="false">
                        <div class="d-flex align-items-center">
                            <i class="bi bi-receipt"></i>
                            <span class="ms-2">RAB</span>
                        </div>
                        <i class="bi bi-chevron-down toggle-icon small"></i>
                    </a>
                    <div class="collapse submenu-container ps-3" id="menuRab">
                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small pt-1">
                            ${acc.rab_bahan_baku !== 'hidden' ? `<li class="mb-1"><a href="#" data-url="rab_bahan_baku.html" class="d-block py-1 px-2 text-decoration-none">RAB Bahan Baku</a></li>` : ''}
                            ${acc.rab_operasional !== 'hidden' ? `<li class="mb-1"><a href="#" data-url="rab_operasional.html" class="d-block py-1 px-2 text-decoration-none">RAB Operasional</a></li>` : ''}
                            ${acc.rab_insentif_sppg !== 'hidden' ? `<li class="mb-1"><a href="#" data-url="rab_insentif_sppg.html" class="d-block py-1 px-2 text-decoration-none">RAB Insentif SPPG</a></li>` : ''}
                        </ul>
                    </div>
                </li>
            ` : ''}

            <!-- 5. MAKER -->
            ${showMaker ? `
                <li class="mb-1">
                    <a class="nav-dropdown-toggle d-flex align-items-center justify-content-between py-2 px-3 rounded text-decoration-none"
                       data-bs-toggle="collapse"
                       href="#menuMaker"
                       role="button"
                       aria-expanded="false">
                        <div class="d-flex align-items-center">
                            <i class="bi bi-tools"></i>
                            <span class="ms-2">Maker</span>
                        </div>
                        <i class="bi bi-chevron-down toggle-icon small"></i>
                    </a>
                    <div class="collapse submenu-container ps-3" id="menuMaker">
                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small pt-1">
                            ${acc.maker_bahan_baku !== 'hidden' ? `<li class="mb-1"><a href="#" data-url="maker_bahan_baku.html" class="d-block py-1 px-2 text-decoration-none">Maker Bahan Baku</a></li>` : ''}
                            ${acc.maker_operasional !== 'hidden' ? `<li class="mb-1"><a href="#" data-url="maker_operasional.html" class="d-block py-1 px-2 text-decoration-none">Maker Operasional</a></li>` : ''}
                            ${acc.maker_relawan !== 'hidden' ? `<li class="mb-1"><a href="#" data-url="maker_relawan.html" class="d-block py-1 px-2 text-decoration-none">Maker Relawan</a></li>` : ''}
                            ${acc.maker_pic_sekolah !== 'hidden' ? `<li class="mb-1"><a href="#" data-url="maker_pic_sekolah.html" class="d-block py-1 px-2 text-decoration-none">Maker PIC Sekolah</a></li>` : ''}
                            ${acc.maker_pic_posyandu !== 'hidden' ? `<li class="mb-1"><a href="#" data-url="maker_pic_posyandu.html" class="d-block py-1 px-2 text-decoration-none">Maker PIC Posyandu</a></li>` : ''}
                            ${acc.maker_insentif_sppg !== 'hidden' ? `<li class="mb-1"><a href="#" data-url="maker_insentif_sppg.html" class="d-block py-1 px-2 text-decoration-none">Maker Insentif SPPG</a></li>` : ''}
                        </ul>
                    </div>
                </li>
            ` : ''}

            <!-- 6. KEUANGAN -->
            ${showKeuangan ? `
                <li class="mb-1">
                    <a class="nav-dropdown-toggle d-flex align-items-center justify-content-between py-2 px-3 rounded text-decoration-none"
                       data-bs-toggle="collapse"
                       href="#menuKeuangan"
                       role="button"
                       aria-expanded="false">
                        <div class="d-flex align-items-center">
                            <i class="bi bi-wallet2"></i>
                            <span class="ms-2">Keuangan</span>
                        </div>
                        <i class="bi bi-chevron-down toggle-icon small"></i>
                    </a>
                    <div class="collapse submenu-container ps-3" id="menuKeuangan">
                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small pt-1">
                            ${acc.saldo_awal !== 'hidden' ? `<li class="mb-1"><a href="#" data-url="keuangan_saldoawal.html" class="d-block py-1 px-2 text-decoration-none">Saldo Awal</a></li>` : ''}
                            ${acc.pemasukan !== 'hidden' ? `<li class="mb-1"><a href="#" data-url="keuangan_pemasukan.html" class="d-block py-1 px-2 text-decoration-none">Pemasukan</a></li>` : ''}
                            ${acc.pengeluaran !== 'hidden' ? `<li class="mb-1"><a href="#" data-url="keuangan_pengeluaran.html" class="d-block py-1 px-2 text-decoration-none">Pengeluaran</a></li>` : ''}
                        </ul>
                    </div>
                </li>
            ` : ''}

            <li class="dropdown-divider my-2"></li>

            <!-- CETAK REPORT -->
            ${acc.cetak_report !== 'hidden' ? `
                <li class="mb-1">
                    <a href="#" data-url="cetak.html" class="d-flex align-items-center py-2 px-3 rounded text-decoration-none">
                        <i class="bi bi-printer"></i>
                        <span class="ms-2">Cetak Report</span>
                    </a>
                </li>
            ` : ''}

            <!-- KHUSUS SUPER USER / PANEL KONTROL -->
            ${isSuperUser ? `
                <li class="mb-1">
                    <a href="#"
                       data-url="super_dashboard.html"
                       class="d-flex align-items-center py-2 px-3 rounded text-decoration-none text-danger fw-bold bg-danger-subtle">
                        <i class="bi bi-shield-lock-fill"></i>
                        <span class="ms-2">Atur Role & Akses</span>
                    </a>
                </li>
            ` : ''}

            <!-- LOGOUT -->
            <li class="mt-3">
                <a href="#"
                   id="sidebarLogout"
                   class="d-flex align-items-center py-2 px-3 rounded text-decoration-none text-secondary">
                    <i class="bi bi-box-arrow-right text-danger"></i>
                    <span class="ms-2 fw-semibold">Keluar (Logout)</span>
                </a>
            </li>

        </ul>
    `;

    // =================================================
    // STYLE ACTIVE MENU
    // =================================================
    const styleId = 'sidebar-active-style';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .sidebar-menu a.active {
                background-color: #e0f2fe !important;
                color: #0284c7 !important;
                font-weight: 600;
                border-radius: 0.375rem;
            }
            .sidebar-menu a.active i {
                color: #0284c7 !important;
            }
        `;
        document.head.appendChild(style);
    }

    // =================================================
    // EVENT KLIK MENU
    // =================================================
    sidebarEl.querySelectorAll('.sidebar-menu a[data-url]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('data-url');

            sidebarEl.querySelectorAll('.sidebar-menu a').forEach(function (a) {
                a.classList.remove('active');
            });
            this.classList.add('active');

            if (typeof window.parent.loadPage === 'function') {
                window.parent.loadPage(targetUrl, this);
            } else {
                const iframe = document.getElementById('contentFrame');
                if (iframe) {
                    iframe.src = targetUrl;
                }
            }
        });
    });

    // =================================================
    // EVENT LOGOUT
    // =================================================
    const logoutButton = document.getElementById('sidebarLogout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function (e) {
            e.preventDefault();
            if (window.parent && typeof window.parent.handleLogout === 'function') {
                window.parent.handleLogout();
            }
        });
    }

    console.log('Sidebar berhasil dimuat dengan akses penuh Superadmin.');
};
