// =====================================================
// FILE: js/sidebar.js (REVISED & SECURE)
// =====================================================

window.renderSidebar = function () {

    const sidebarEl = document.getElementById('sidebar');

    if (!sidebarEl) {
        console.error('Elemen #sidebar tidak ditemukan.');
        return;
    }

    // Ambil data user TERBARU dari localStorage
    let currentUser = {};

    try {
        currentUser = JSON.parse(
            localStorage.getItem('sppg_user') || '{}'
        );
    } catch (error) {
        console.error('Gagal membaca data user:', error);
    }

    const userJabatan = String(currentUser.jabatan || '')
        .toLowerCase()
        .trim();

    const userRole = String(currentUser.role_access || '')
        .toLowerCase()
        .trim();

    // Super User harus berdasarkan role eksplisit
    // atau jabatan yang memang mengandung kata super / admin utama
    const isSuperUser =
        userJabatan.includes('super') ||
        userRole === 'superadmin' ||
        userRole === 'super_user' ||
        userRole === 'admin';

    // Ambil hak akses menu dengan pengaman objek kosong
    const permissions = currentUser.menu_permissions || {};

    // Fungsi pengecekan akses
    function getAccess(menuKey) {
        // Super User mendapatkan akses penuh
        if (isSuperUser) return 'edit';

        // Staf mendapatkan akses sesuai pengaturan database/localStorage
        const access = permissions[menuKey];

        // Jika tidak ditemukan atau null, berikan default 'hidden'
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
    // CEK KELOMPOK MENU
    // =================================================

    const showMaster =
        acc.master_sppg !== 'hidden' ||
        acc.master_petugas !== 'hidden' ||
        acc.master_pm !== 'hidden' ||
        acc.master_pic_sekolah !== 'hidden' ||
        acc.master_pic_posyandu !== 'hidden' ||
        acc.master_relawan !== 'hidden' ||
        acc.master_barang !== 'hidden' ||
        acc.master_suplier !== 'hidden';

    const showRab =
        acc.rab_bahan_baku !== 'hidden' ||
        acc.rab_operasional !== 'hidden' ||
        acc.rab_insentif_sppg !== 'hidden';

    const showMaker =
        acc.maker_bahan_baku !== 'hidden' ||
        acc.maker_operasional !== 'hidden' ||
        acc.maker_relawan !== 'hidden' ||
        acc.maker_pic_sekolah !== 'hidden' ||
        acc.maker_pic_posyandu !== 'hidden' ||
        acc.maker_insentif_sppg !== 'hidden';

    const showKeuangan =
        acc.saldo_awal !== 'hidden' ||
        acc.pemasukan !== 'hidden' ||
        acc.pengeluaran !== 'hidden';

    // =================================================
    // MEMBUAT SIDEBAR
    // =================================================

    sidebarEl.innerHTML = `

        <div class="sidebar-header d-flex justify-content-between align-items-center">

            <h5 class="m-0 text-truncate fw-bold fs-6 text-dark">
                <i class="bi bi-layers-fill text-primary me-2"></i>
                <span>APP LPDH Yayasan</span>
            </h5>

        </div>

        <ul class="sidebar-menu">

            <!-- DASHBOARD -->

            ${acc.dashboard !== 'hidden' ? `
                <li>
                    <a href="#" data-url="dashboard.html" class="active">
                        <i class="bi bi-grid-1x2-fill"></i>
                        <span class="ms-2">Dashboard</span>
                    </a>
                </li>
            ` : ''}


            <!-- 1. DATA MASTER -->

            ${showMaster ? `

                <li>

                    <a class="nav-dropdown-toggle"
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

                    <div class="collapse submenu-container" id="menuMaster">

                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                            ${acc.master_sppg !== 'hidden' ? `
                                <li><a href="#" data-url="master_sppg.html">Master SPPG</a></li>
                            ` : ''}

                            ${acc.master_petugas !== 'hidden' ? `
                                <li><a href="#" data-url="master_petugas.html">Master Petugas</a></li>
                            ` : ''}

                            ${acc.master_pm !== 'hidden' ? `
                                <li><a href="#" data-url="master_pm.html">Master PM</a></li>
                            ` : ''}

                            ${acc.master_pic_sekolah !== 'hidden' ? `
                                <li><a href="#" data-url="master_pic_sekolah.html">Master PIC Sekolah</a></li>
                            ` : ''}

                            ${acc.master_pic_posyandu !== 'hidden' ? `
                                <li><a href="#" data-url="master_pic_posyandu.html">Master PIC Posyandu</a></li>
                            ` : ''}

                            ${acc.master_relawan !== 'hidden' ? `
                                <li><a href="#" data-url="master_relawan.html">Master Relawan</a></li>
                            ` : ''}

                            ${acc.master_barang !== 'hidden' ? `
                                <li><a href="#" data-url="master_barang.html">Master Barang</a></li>
                            ` : ''}

                            ${acc.master_suplier !== 'hidden' ? `
                                <li><a href="#" data-url="master_suplier.html">Master Suplier</a></li>
                            ` : ''}

                        </ul>

                    </div>

                </li>

            ` : ''}


            <!-- 2. DATA PM & PIC -->

            ${acc.data_pm_on_going !== 'hidden' ? `

                <li>

                    <a class="nav-dropdown-toggle"
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

                    <div class="collapse submenu-container" id="menuPmPic">

                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                            <li>
                                <a href="#" data-url="data_pm_on_going.html">
                                    Data PM On Going
                                </a>
                            </li>

                        </ul>

                    </div>

                </li>

            ` : ''}


            <!-- 3. RELAWAN -->

            ${acc.absen_relawan !== 'hidden' ? `

                <li>

                    <a class="nav-dropdown-toggle"
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

                    <div class="collapse submenu-container" id="menuRelawan">

                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                            <li>
                                <a href="#" data-url="absen_relawan.html">
                                    Absen Relawan
                                </a>
                            </li>

                        </ul>

                    </div>

                </li>

            ` : ''}


            <!-- 4. RAB -->

            ${showRab ? `

                <li>

                    <a class="nav-dropdown-toggle"
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

                    <div class="collapse submenu-container" id="menuRab">

                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                            ${acc.rab_bahan_baku !== 'hidden' ? `
                                <li><a href="#" data-url="rab_bahan_baku.html">RAB Bahan Baku</a></li>
                            ` : ''}

                            ${acc.rab_operasional !== 'hidden' ? `
                                <li><a href="#" data-url="rab_operasional.html">RAB Operasional</a></li>
                            ` : ''}

                            ${acc.rab_insentif_sppg !== 'hidden' ? `
                                <li><a href="#" data-url="rab_insentif_sppg.html">RAB Insentif SPPG</a></li>
                            ` : ''}

                        </ul>

                    </div>

                </li>

            ` : ''}


            <!-- 5. MAKER -->

            ${showMaker ? `

                <li>

                    <a class="nav-dropdown-toggle"
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

                    <div class="collapse submenu-container" id="menuMaker">

                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                            ${acc.maker_bahan_baku !== 'hidden' ? `
                                <li><a href="#" data-url="maker_bahan_baku.html">Maker Bahan Baku</a></li>
                            ` : ''}

                            ${acc.maker_operasional !== 'hidden' ? `
                                <li><a href="#" data-url="maker_operasional.html">Maker Operasional</a></li>
                            ` : ''}

                            ${acc.maker_relawan !== 'hidden' ? `
                                <li><a href="#" data-url="maker_relawan.html">Maker Relawan</a></li>
                            ` : ''}

                            ${acc.maker_pic_sekolah !== 'hidden' ? `
                                <li><a href="#" data-url="maker_pic_sekolah.html">Maker PIC Sekolah</a></li>
                            ` : ''}

                            ${acc.maker_pic_posyandu !== 'hidden' ? `
                                <li><a href="#" data-url="maker_pic_posyandu.html">Maker PIC Posyandu</a></li>
                            ` : ''}

                            ${acc.maker_insentif_sppg !== 'hidden' ? `
                                <li><a href="#" data-url="maker_insentif_sppg.html">Maker Insentif SPPG</a></li>
                            ` : ''}

                        </ul>

                    </div>

                </li>

            ` : ''}


            <!-- 6. KEUANGAN -->

            ${showKeuangan ? `

                <li>

                    <a class="nav-dropdown-toggle"
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

                    <div class="collapse submenu-container" id="menuKeuangan">

                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                            ${acc.saldo_awal !== 'hidden' ? `
                                <li><a href="#" data-url="keuangan_saldoawal.html">Saldo Awal</a></li>
                            ` : ''}

                            ${acc.pemasukan !== 'hidden' ? `
                                <li><a href="#" data-url="keuangan_pemasukan.html">Pemasukan</a></li>
                            ` : ''}

                            ${acc.pengeluaran !== 'hidden' ? `
                                <li><a href="#" data-url="keuangan_pengeluaran.html">Pengeluaran</a></li>
                            ` : ''}

                        </ul>

                    </div>

                </li>

            ` : ''}


            <li class="dropdown-divider my-2"></li>


            <!-- CETAK REPORT -->

            ${acc.cetak_report !== 'hidden' ? `

                <li>
                    <a href="#" data-url="cetak.html">
                        <i class="bi bi-printer"></i>
                        <span class="ms-2">Cetak Report</span>
                    </a>
                </li>

            ` : ''}


            <!-- KHUSUS SUPER USER -->

            ${isSuperUser ? `

                <li>
                    <a href="#"
                       data-url="super_dashboard.html"
                       class="text-danger fw-bold">

                        <i class="bi bi-shield-lock-fill"></i>
                        <span class="ms-2">Atur Role & Akses</span>

                    </a>
                </li>

            ` : ''}


            <!-- LOGOUT -->

            <li class="mt-3">

                <a href="#"
                   id="sidebarLogout"
                   class="text-secondary hover-danger">

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

    sidebarEl.querySelectorAll('.sidebar-menu a[data-url]')
        .forEach(function (link) {

            link.addEventListener('click', function (e) {

                e.preventDefault();

                const targetUrl = this.getAttribute('data-url');

                sidebarEl.querySelectorAll('.sidebar-menu a')
                    .forEach(function (a) {
                        a.classList.remove('active');
                    });

                this.classList.add('active');

                const parentCollapse = this.closest('.collapse');

                if (parentCollapse) {

                    const parentToggle = sidebarEl.querySelector(
                        `[href="#${parentCollapse.id}"]`
                    );

                    if (parentToggle) {
                        parentToggle.classList.add('active');
                    }
                }

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

            if (window.parent &&
                typeof window.parent.handleLogout === 'function') {

                window.parent.handleLogout();

            }

        });
    }

    console.log('Sidebar berhasil dimuat.');
};