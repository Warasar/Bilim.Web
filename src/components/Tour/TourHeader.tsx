import React, { useEffect, useRef, useState } from "react";
import Modal from "../../modules/YaKIT.WEB.KIT/components/Modal/Modal";
import Input from "../../modules/YaKIT.WEB.KIT/components/Input/Input";

type Props = {
  sendMessage: (name: string, phone: string, mail: string) => void;
};

export const useClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handler]);

  return ref;
};

export default function TourHeader({ sendMessage }: Props) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const headerClassName = !isScrolled ? "tour-header" : "tour-header-scrolled";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);

      document.querySelectorAll(`[id*="tour_"]`).forEach((element: any) => {
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition + 100 >= offsetTop && scrollPosition + 100 < offsetTop + offsetHeight) {
            setActiveSection(element.id);
          } else if (scrollPosition < 100) {
            setActiveSection(null);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const clickScrollIntoDiv = (id: any) => {
    const element = document.getElementById(`tour_${id}`);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  // меняет input
  const changedString = (e: any, code: string) => {
    if (code === "mail") {
      setMail(e.target.value);
    } else if (code === "phone") {
      setPhone(e.target.value);
    } else {
      setName(e.target.value);
    }
  };

  return (
    <>
      <div className={`${headerClassName}-bg`}>
        <div className={`${headerClassName}`}>
          {/* лого  */}
          <div
            className={`${headerClassName}-logo`}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          />

          {/* кнопки */}
          <div className={`${headerClassName}-flex`}>
            <div
              className={`${headerClassName}-flex-item${activeSection === `tour_about` ? "-active" : ""}`}
              onClick={() => clickScrollIntoDiv("about")}
            >
              О нас
            </div>
            <div
              className={`${headerClassName}-flex-item${activeSection === `tour_video` ? "-active" : ""}`}
              onClick={() => clickScrollIntoDiv("video")}
            >
              Видеообзоры
            </div>
            <div
              className={`${headerClassName}-flex-item${activeSection === `tour_products` ? "-active" : ""}`}
              onClick={() => clickScrollIntoDiv("products")}
            >
              Наши продукты
            </div>
            <div
              className={`${headerClassName}-flex-item${activeSection === `tour_otziv` ? "-active" : ""}`}
              onClick={() => clickScrollIntoDiv("otziv")}
            >
              Отзывы
            </div>
          </div>

          {/* Оставить заявку */}
          <div className={`${headerClassName}-flex`}>
            <div className={`${headerClassName}-button`} onClick={() => setModalVisible(true)}>
              <div className={`${headerClassName}-button-mail`} />
              Оставить заявку
            </div>
          </div>

          {/* Мобильное меню кнопка */}
          <div className={`mobile-menu-button${isScrolled ? "-scrolled" : ""}`} onClick={() => setMobileMenuOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
          ×
        </button>
        <div className="mobile-menu-items">
          <div className="mobile-menu-item" onClick={() => clickScrollIntoDiv("about")}>
            О нас
          </div>
          <div className="mobile-menu-item" onClick={() => clickScrollIntoDiv("video")}>
            Видеообзоры
          </div>
          <div className="mobile-menu-item" onClick={() => clickScrollIntoDiv("products")}>
            Наши продукты
          </div>
          <div className="mobile-menu-item" onClick={() => clickScrollIntoDiv("otziv")}>
            Отзывы
          </div>
          <div className="mobile-menu-item" onClick={() => setModalVisible(true)}>
            Оставить заявку
          </div>
        </div>
      </div>

      <Modal
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
        }}
        title={
          <div className="tour-text-medium tour-header-modal-title">Получите консультацию от наших специалистов</div>
        }
      >
        <div className="tour-header-modal">
          <div className="tour-text-default">
            Мы свяжемся с вами в ближайшее время, проконсультируем по всем вопросам и поможем подобрать наиболее
            подходящее вам решение.
          </div>
          <div className="tour-header-modal-item" key={`survey-item-name`}>
            <div className="tour-text-default">Имя*</div>
            <Input
              value={name}
              onValueChanged={(e: any) => changedString(e, "name")}
              type={"string"}
              size="big"
              placeholder="Иван Иванов"
            />
          </div>
          <div className="tour-header-modal-item" key={`survey-item-name`}>
            <div className="tour-text-default">Телефон*</div>
            <Input
              value={phone}
              onValueChanged={(e: any) => changedString(e, "phone")}
              type={"phone"}
              size="big"
              placeholder="+7 (914) 999-99-99"
            />
          </div>
          <div className="tour-header-modal-item" key={`survey-item-name`}>
            <div className="tour-text-default">Электронная почта</div>
            <Input
              value={mail}
              onValueChanged={(e: any) => changedString(e, "mail")}
              type={"mail"}
              size="big"
              placeholder="example@mail.com"
            />
          </div>
          <div className="tour-text-default" style={{ paddingTop: "16px" }}>
            * - обязательные поля для заполнения
          </div>
          <div
            className={`tour-header-modal-button${name.length && phone.length ? "" : "-disabled"}`}
            onClick={() => {
              sendMessage(name, phone, mail);
            }}
          >
            Оставить заявку
          </div>
        </div>
      </Modal>
    </>
  );
}
