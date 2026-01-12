-- CreateTable
CREATE TABLE `Cabang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `daerah_id` INTEGER NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `maps_iframe` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `tanggal_dibuka` DATETIME(3) NOT NULL,
    `nama_penanggung` VARCHAR(191) NOT NULL,
    `email_kontak` VARCHAR(191) NOT NULL,
    `nomor_kontak` VARCHAR(191) NOT NULL,
    `hari_operasional` VARCHAR(191) NULL,
    `jam_buka` VARCHAR(191) NOT NULL,
    `jam_tutup` VARCHAR(191) NOT NULL,
    `gambar_url` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cabang` ADD CONSTRAINT `Cabang_daerah_id_fkey` FOREIGN KEY (`daerah_id`) REFERENCES `Daerah`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
