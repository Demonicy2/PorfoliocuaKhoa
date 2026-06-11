from pypdf import PdfWriter

pdfs = [
    "Bai1_ThaoTacCoBan fixed.pdf",
    "Bai2_TimKiemThongTin.pdf",
    "Bai3_VietPrompt.pdf",
    "Bai4_HopTacTrucTuyen_fixed.pdf",
    "Bai5_SangTaoNoiDungAI.pdf",
    "Bai6_AITrachNhiem fixed.pdf"
]

try:
    merger = PdfWriter()
    for pdf in pdfs:
        merger.append(pdf)
    
    merger.write("Portfolio_TongHop.pdf")
    merger.close()
    print("Merged successfully!")
except Exception as e:
    print(f"Error: {e}")
