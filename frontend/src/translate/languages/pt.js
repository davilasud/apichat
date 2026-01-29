const messages = {
  pt: {
    translations: {
      signup: {
        title: "Registro",
        toasts: {
          success: "¡Usuario creado con éxito!¡Haz tu inicio de sesión!!!.",
          fail: "Error al crear usuario.Verifique los datos informados.",
        },
        form: {
          name: "Nombre",
          email: "Email",
          password: "Contraseña",
        },
        buttons: {
          submit: "Registro",
          login: "¿Ya tienes una cuenta?¡Entre!",
        },
      },
      login: {
        title: "Login",
        form: {
          email: "Email",
          password: "Contraseña",
        },
        buttons: {
          submit: "Entrar",
          register: "¡Regístrese, ahora mismo!",
        },
      },
      plans: {
        form: {
          name: "Nombre",
          users: "Usuários",
          connections: "Conexión",
          campaigns: "Campañas",
          schedules: "Programación",
          enabled: "Habilitadas",
          disabled: "Deshabilitadas",
          clear: "Cancelar",
          delete: "Excluir",
          save: "Guardar",
          yes: "Si",
          no: "No",
          money: "$",
        },
      },
      companies: {
        title: "Registro Empresa",
        form: {
          name: "Nombre da Empresa",
          plan: "plano",
          token: "Token",
          submit: "Registro",
          success: "¡Compañía creada con éxito!",
        },
      },
      auth: {
        toasts: {
          success: "¡Iniciar sesión con éxito!",
        },
        token: "Token",
      },
      dashboard: {
        charts: {
          perDay: {
            title: "Llamadas de hoy: ",
          },
        },
      },
      connections: {
        title: "Conexión",
        toasts: {
          deleted: "¡Conexión con WhatsApp eliminada con éxito!",
        },
        confirmationModal: {
          deleteTitle: "Borrar",
          deleteMessage: "¿Está seguro?Esta acción no se puede revertir.",
          disconnectTitle: "Desconectar",
          disconnectMessage:
            "¿Está seguro? Deberá leer el código QR nuevamente.",
        },
        buttons: {
          add: "Agregar whatsapp",
          disconnect: "desconectar",
          tryAgain: "Intentar otra vez",
          qrcode: "QR CODE",
          newQr: "nuevo QR CODE",
          connecting: "Conectando",
        },
        toolTips: {
          disconnected: {
            title: "No iniciar la sesión de WhatsApp",
            content:
              "Asegúrese de que su teléfono esté conectado a Internet e intente nuevamente, o solicite un nuevo código QR",
          },
          qrcode: {
            title: "Esperando la lectura del código QR",
            content:
              "Haga clic en el botón 'Código QR' y lea el código QR con su teléfono para iniciar la sesión",
          },
          connected: {
            title: "Conexión establecida!",
          },
          timeout: {
            title: "La conexión con el teléfono celular se perdió",
            content:
              "Asegúrese de que su teléfono esté conectado a Internet y WhatsApp esté abierto, o haga clic en el botón 'Desconectar' para obtener un nuevo código QR",
          },
        },
        table: {
          name: "Nombre",
          status: "Status",
          lastUpdate: "Última actualizacion",
          default: "Estándar",
          actions: "Acciones",
          session: "Sesión",
        },
      },
      whatsappModal: {
        title: {
          add: "Agregar WhatsApp",
          edit: "Editar WhatsApp",
        },		
		 tabs: {
          general: "General",
          messages: "Mensajes",
          assessments: "Evaluaciones",
          integrations: "Integraciones",
          schedules: "Horário de expediente",
		 },
        form: {
          name: "Nombre",
          default: "Estándar",
          sendIdQueue: "fila",
          timeSendQueue: "Redirecionar para fila en X minutos",
          queueRedirection: "Redirecionamento de Fila",
		  outOfHoursMessage: "Mensaje desde fuera de la oficina",
          queueRedirectionDesc: "Seleccione una cola para contactos que no tengan una cola que se redirle",
          prompt: "Prompt",
          //maxUseBotQueues: "Enviar bot x vezes",
          //timeUseBotQueues: "Intervalo em minutos entre envio de bot",
          expiresTicket: "Finalizar chats de apertura después de x minutos",
          expiresInactiveMessage: "Mensaje de cierre de inactividad",
		  greetingMessage: "Mensaje de saludo",
          complationMessage: "Mensaje de conclusión",
		  sendIdQueue: "Fila",
        },
        buttons: {
          okAdd: "Para agregar",
          okEdit: "Guardar",
          cancel: "Cancelar",
        },
        success: "Whatsapp guardado con éxito.",
      },
      qrCode: {
        message: "Lea el Code QR para iniciar la sesión",
      },
      contacts: {
        title: "Contactos",
        toasts: {
          deleted: "¡Contacte con éxito eliminado!",
		  deletedAll: "¡Todos los contactos eliminados con éxito!",
        },
		  searchPlaceholder: "Buscar...",
          confirmationModal: {
          deleteTitle: "Borrar ",
          deleteAllTitle: "Borrar Todos",
          importTitle: "Importar contactos",
          deleteMessage: "¿Estás seguro de que quieres eliminar este contacto?Todas las entradas relacionadas se perderán.",
          deleteAllMessage: "¿Estás seguro de que quieres eliminar todos los contactos?Todas las entradas relacionadas se perderán.",
          importMessage: "¿Quieres importar todos los contactos por teléfono?",
        },
        buttons: {
          import: "Importar Contactos",
          add: "Agregar contacto",
          export: "Exportar Contactos",
          delete: "Excluir Todos Contactos"
        },
        table: {
          name: "Nombre",
          whatsapp: "WhatsApp",
          email: "Email",
          actions: "Acciones",
        },
      },
      queueIntegrationModal: {
        title: {
          add: "Agregar proyecto",
          edit: "Editar proyecto",
        },
        form: {
          id: "ID",
          type: "Tipo",
          name: "Nombre",
          projectName: "Nombre del proyecto",
          language: "Idioma",
          jsonContent: "JsonContent",
          urlN8N: "URL",
          typebotSlug: "Typebot - Slug",
          typebotExpires: "Tiempo en minutos para expirar una conversación",
          typebotKeywordFinish: "Palabra para finalizar o ticket",
          typebotKeywordRestart: "Palabra para reiniciar o fluir",
          typebotRestartMessage: "Mensaje al reiniciar la conversación",
          typebotUnknownMessage: "Mensaje de opción no válido",
          typebotDelayMessage: "Intervalo (ms) entre mensajes",   
        },
        buttons: {
          okAdd: "Agregar",
          okEdit: "Guardar",
          cancel: "Cancelar",
          test: "Testear Bot",
        },
        messages: {
          testSuccess: "¡Integración probada con éxito!",
          addSuccess: "Integración agregada con éxito.",
          editSuccess: "Integración editada con éxito.",
        },
      },
	  sideMenu: {
            name: "Menu Lateral Inicial",
            note: "Si está habilitado, el menú lateral comenzará cerrado",
            options: {
              enabled: "Abierto",
              disabled: "Cerrado",
            },
          },
      promptModal: {
        form: {
          name: "Nombre",
          prompt: "Prompt",
          voice: "Voz",
          max_tokens: "Máximo de Tokens en respuesta",
          temperature: "Temperatura",
          apikey: "API Key",
          max_messages: "Máximo de Mensajes de historia",
          voiceKey: "Chave da API de Voz",
          voiceRegion: "Región de Voz",
        },
        success: "Prompt guardado con éxito!",
        title: {
          add: "Agregar Prompt",
          edit: "Editar Prompt",
        },
        buttons: {
          okAdd: "Agregar",
          okEdit: "Guardar",
          cancel: "Cancelar",
        },
      },
      prompts: {
        title: "Prompts",
        table: {
          name: "Nome",
          queue: "Setor/Fila",
          max_tokens: "Máximo Tokens Respuesta",
          actions: "Acciones",
        },
        confirmationModal: {
          deleteTitle: "Excluir",
          deleteMessage: "¿Está seguro?¡Esta acción no se puede revertir!",
        },
        buttons: {
          add: "Agregar Prompt",
        },
      },
      contactModal: {
        title: {
          add: "Agregar contacto",
          edit: "Editar contacto",
        },
        form: {
          mainInfo: "Info de contacto",
          extraInfo: "Información adicional",
          name: "Nombre",
          number: "Número do Whatsapp",
          email: "Email",
          extraName: "Nombre de campo",
          extraValue: "Valor",
          whatsapp: "Conexión de origen: "
        },
        buttons: {
          addExtraInfo: "Agregar información",
          okAdd: "Agregar",
          okEdit: "Guardar",
          cancel: "Cancelar",
        },
        success: "Contacto con éxito.",
      },
      queueModal: {
        title: {
          add: "Agregar fila",
          edit: "Editar fila",
        },
        form: {
          name: "Nombre",
          color: "Color",
          greetingMessage: "Mensaje de saludo",
          complationMessage: "Mensaje de conclusión",
          outOfHoursMessage: "Mensaje desde fuera de la oficina",
          ratingMessage: "Mensaje de evaluación",
          token: "Token",
          orderQueue: "Orden de línea (Bot)",
          integrationId: "Integración",
        },
        buttons: {
          okAdd: "Agregar",
          okEdit: "Guardar",
          cancel: "Cancelar",
        },
      },
      userModal: {
        title: {
          add: "Agregar usuário",
          edit: "Editar usuário",
        },
        form: {
          name: "Nombre",
          email: "Email",
          password: "Contraseña",
          profile: "Perfil",
          whatsapp: "Conexión predeterminada",

          allTicket: "Ticket No hay cola [invisible]",
          allTicketEnabled: "Habilitado",
          allTicketDesabled: "Desabilitado",
        },
        buttons: {
          okAdd: "Agregar",
          okEdit: "Guardar",
          cancel: "Cancelar",
        },
        success: "El usuario guardado con éxito.",
      },
      scheduleModal: {
        title: {
          add: "Nuevo programación",
          edit: "Editar Programación",
        },
        form: {
          body: "Mensaje",
          contact: "Contacto",
          sendAt: "Fecha de programación",
          sentAt: "Fecha de envío",
        },
        buttons: {
          okAdd: "Agregar",
          okEdit: "Guardar",
          cancel: "Cancelar",
        },
        success: "Éxito.",
      },
      tagModal: {
        title: {
          add: "Nueva Etiqueta",
          edit: "Editar Etiqueta",
        },
        form: {
          name: "Nombre",
          color: "color",
        },
        buttons: {
          okAdd: "agregar",
          okEdit: "Guardar",
          cancel: "Cancelar",
        },
        success: "Etiqueta guardada con éxito.",
      },
      chat: {
        noTicketMessage: "Seleccione un Ticket para comenzar a hablar.",
      },
      uploads: {
        titles: {
          titleUploadMsgDragDrop: "Arrastre y suelte archivos en el campo a continuación",
          titleFileList: "Lista de archivos(s)"
        },
      },
      ticketsManager: {
        buttons: {
          newTicket: "nuevo",
        },
      },
      ticketsQueueSelect: {
        placeholder: "filas",
      },
      tickets: {
        toasts: {
          deleted: "El servicio que fue fue eliminado.",
        },
        notification: {
          message: "Mensaje de",
        },
        tabs: {
          open: { title: "Abierto" },
          closed: { title: "Resuelto" },
          search: { title: "Buscar" },
        },
        search: {
          placeholder: "Buscar servicio y mensajes",
        },
        buttons: {
          showAll: "Todos",
        },
      },
      transferTicketModal: {
        title: "Transferir Ticket",
        fieldLabel: "Digite para buscar usuários",
        fieldQueueLabel: "Transferir para fila",
        fieldQueuePlaceholder: "Selecione una fila",
        noOptions: "No se encuentra el usuario con ese nombre",
        buttons: {
          ok: "Transferir",
          cancel: "Cancelar",
        },
      },
      ticketsList: {
        pendingHeader: "Aguardando",
        assignedHeader: "Atendiendo",
        noTicketsTitle: "Nada aqui!",
        noTicketsMessage:
          "No se encuentra el servicio con este estado o término buscado",
        buttons: {
          accept: "Aceptar",
          closed: "Finalizar",
          reopen: "Reabrir"
        },
      },
      newTicketModal: {
        title: "Crear Ticket",
        fieldLabel: "Escriba para buscar el contacto",
        add: "Agregar",
        buttons: {
          ok: "Guardar",
          cancel: "Cancelar",
        },
      },
      mainDrawer: {
        listItems: {
          dashboard: "Panel",
          connections: "Conexión",
          tickets: "Cuidado",
          quickMessages: "Respuestas rápidas",
          contacts: "Contactos",
          queues: "Filas & Chatbot",
          tags: "Etiquetas",
          administration: "Administración",
          users: "Usuários",
          settings: "Ajustes",
          helps: "Ayuda",
          messagesAPI: "API",
          schedules: "Programación",
          campaigns: "Campañas",
          annoucements: "Informativos",
          chats: "Chat Interno",
          financeiro: "Financiero",
          files: "Lista de archivos",
          prompts: "Open.Ai",
          queueIntegration: "Integraciones",
        },
        appBar: {
          notRegister:"Sin notificaciones",
          user: {
            profile: "Perfil",
            logout: "Salir",
          },
        },
      },
      queueIntegration: {
        title: "Integraciones",
        table: {
          id: "ID",
          type: "Tipo",
          name: "Nombre",
          projectName: "Nombre del proyecto",
          language: "Idioma",
          lastUpdate: "Ultima actualizar",
          actions: "Comportamiento",
        },
        buttons: {
          add: "Agregar proyecto",
        },
        searchPlaceholder: "Buscar...",
        confirmationModal: {
          deleteTitle: "Excluir",
          deleteMessage:
            "¿Está seguro?¡Esta acción no se puede revertir!y se eliminarán de las líneas y conexiones vinculadas",
        },
      },
      files: {
        title: "Lista de archivos",
        table: {
          name: "Nombre",
          contacts: "Contactos",
          actions: "Acción",
        },
        toasts: {
          deleted: "¡Lista eliminada con éxito!",
          deletedAll: "¡Todas las listas se han eliminado con éxito!",
        },
        buttons: {
          add: "Agregar",
          deleteAll: "Borrar Todos",
        },
        confirmationModal: {
          deleteTitle: "Borrar",
          deleteAllTitle: "Borrar Todos",
          deleteMessage: "¿Estás seguro de que quieres eliminar esta lista?",
          deleteAllMessage: "¿Estás seguro de que quieres eliminar todas las listas?",
        },
      },
      messagesAPI: {
        title: "API",
        textMessage: {
          number: "Número",
          body: "Mensaje",
          token: "Token registrado",
        },
        mediaMessage: {
          number: "Número",
          body: "Nombre del archivo",
          media: "Archivo",
          token: "Token registrado",
        },
      },
      notifications: {
        noTickets: "Sin notificación.",
      },
      quickMessages: {
        title: "Respuestas rápidas",
        searchPlaceholder: "Buscar...",
        noAttachment: "Sin pico",
        confirmationModal: {
          deleteTitle: "Exclusión",
          deleteMessage: "¡Esta acción es irreversible!¿Quieres continuar?",
        },
        buttons: {
          add: "Agregar",
          attach: "Adjuntar archivo",
          cancel: "Cancelar",
          edit: "Editar",
        },
        toasts: {
          success: "¡Atajo de éxito!",
          deleted: "Atajo eliminado con éxito!",
        },
        dialog: {
          title: "Mensaje rápido",
          shortcode: "Atajo",
          message: "Respuesta",
          save: "Guardar",
          cancel: "Cancelar",
          geral: "Permitir editar",
          add: "Agregar",
          edit: "Editar",
          visao: "Permitir visión",
        },
        table: {
          shortcode: "Atajo",
          message: "Mensaje",
          actions: "Comportamiento",
          mediaName: "Nombre del archivo",
          status: "Status",
        },
      },
      messageVariablesPicker: {
        label: "Disponible varíable",
        vars: {
          contactFirstName: "Nombre de pila",
          contactName: "Nombre",
          greeting: "Saludo",
          protocolNumber: "Protocolo",
          date: "fecha",
          hour: "Hora",
        },
      },
      contactLists: {
        title: "Listas de Contatos",
        table: {
          name: "Nombre",
          contacts: "Contactos",
          actions: "Acciones",
        },
        buttons: {
          add: "Nueva Lista",
        },
        dialog: {
          name: "Nombre",
          company: "Empresa",
          okEdit: "Editar",
          okAdd: "Agregar",
          add: "Agregar",
          edit: "Editar",
          cancel: "Cancelar",
        },
        confirmationModal: {
          deleteTitle: "Excluir",
          deleteMessage: "Esta acción no se puede revertir.",
        },
        toasts: {
          deleted: "Registro excluido",
        },
      },
      contactListItems: {
        title: "Contactos",
        searchPlaceholder: "Buscar",
        buttons: {
          add: "Nuevo",
          lists: "Listas",
          import: "Importar",
        },
        dialog: {
          name: "Nombre",
          number: "Número",
          whatsapp: "Whatsapp",
          email: "E-mail",
          okEdit: "Editar",
          okAdd: "Agregar",
          add: "Agregar",
          edit: "Editar",
          cancel: "Cancelar",
        },
        table: {
          name: "Nombre",
          number: "Número",
          whatsapp: "Whatsapp",
          email: "E-mail",
          actions: "Comportamiento",
        },
        confirmationModal: {
          deleteTitle: "Excluir",
          deleteMessage: "Esta acción no se puede revertir.",
          importMessage: "¿Quieres importar los contactos de esta hoja de cálculo? ",
          importTitlte: "Importar",
        },
        toasts: {
          deleted: "Registro excluído",
        },
      },
      campaigns: {
        title: "Campañas",
        searchPlaceholder: "Buscar",
        buttons: {
          add: "Nueva campaña",
          contactLists: "Listas de Contactos",
        },
        table: {
          name: "Nombre",
          whatsapp: "Conexión",
          contactList: "Lista de Contactos",
          status: "Status",
          scheduledAt: "Agendamento",
          completedAt: "Concluída",
          confirmation: "Confirmación",
          actions: "Comportamiento",
        },
        dialog: {
          new: "Nueva campaña",
          update: "Editar Campaña",
          readonly: "Apenas Visualización",
          form: {
            name: "Nombre",
            message1: "Mensaje 1",
            message2: "Mensaje 2",
            message3: "Mensaje 3",
            message4: "Mensaje 4",
            message5: "Mensaje 5",
            confirmationMessage1: "Mensaje de confirmación 1",
            confirmationMessage2: "Mensaje de confirmación 2",
            confirmationMessage3: "Mensaje de confirmación 3",
            confirmationMessage4: "Mensaje de confirmación 4",
            confirmationMessage5: "Mensaje de confirmación 5",
            messagePlaceholder: "Contenido de mensaje",
            whatsapp: "Conexión",
            status: "Status",
            scheduledAt: "Agendamento",
            confirmation: "Confirmación",
            contactList: "Lista de Contacto",
            tagList: "Lista de Tags",
            fileList: "Lista de Archivos"
          },
          buttons: {
            add: "Agregar",
            edit: "Atualizar",
            okadd: "Ok",
            cancel: "Cancelar ",
            restart: "Reiniciar ",
            close: "Cerrar",
            attach: "Adjuntar archivo",
          },
        },
        confirmationModal: {
          deleteTitle: "Excluir",
          deleteMessage: "Esta acción no se puede revertir.",
        },
        toasts: {
          success: "Operación realizada con éxito",
          cancel: "Campaña cancelada",
          restart: "Reanudar",
          deleted: "Registro excluído",
        },
      },
      announcements: {
        active: 'Ativo',
        inactive: 'Inativo',
        title: "Informativos",
        searchPlaceholder: "Buscar",
        buttons: {
          add: "Nuevo boletín",
          contactLists: "Listas de Informativos",
        },
        table: {
          priority: "Prioridad",
          title: "Title",
          text: "Texto",
          mediaName: "Archivo",
          status: "Status",
          actions: "Acciones",
        },
        dialog: {
          edit: "Edición informativa",
          add: "Nuevo boletín",
          update: "Editar Informativo",
          readonly: "Solo visualización",
          form: {
            priority: "Prioridad",
            title: "Title",
            text: "Texto",
            mediaPath: "Archivo",
            status: "Status",
          },
          buttons: {
            add: "Agregar",
            edit: "Atualizar",
            okadd: "Ok",
            cancel: "Cancelar",
            close: "Cerrar",
            attach: "Adjuntar archivo",
          },
        },
        confirmationModal: {
          deleteTitle: "Excluir",
          deleteMessage: "Esta acción no se puede revertir.",
        },
        toasts: {
          success: "Operación realizada con éxito",
          deleted: "Registro excluído",
        },
      },
      campaignsConfig: {
        title: "Configuración de campaña",
      },
      queues: {
        title: "Filas & Chatbot",
        table: {
		  id:"ID",
          name: "Nombre",
          color: "Color",
          greeting: "Mensaje de saludo",
          actions: "Comportamiento",
          orderQueue: "Orden de fila (bot)",
        },
        buttons: {
          add: "Adicionar fila",
        },
        confirmationModal: {
          deleteTitle: "Excluir",
          deleteMessage:
            "¿Está seguro?¡Esta acción no se puede revertir!Las llamadas de esta línea continuarán existiendo, pero ya no tendrán ninguna línea atribuida.",
        },
      },
      queueSelect: {
        inputLabel: "Filas",
      },
      users: {
        title: "Usuários",
        table: {
		  id: "ID",
          name: "Nombre",
          email: "Email",
          profile: "Perfil",
          actions: "Acciones",
        },
        buttons: {
          add: "Agregar usuário",
        },
        toasts: {
          deleted: "Usuario excluido con exito.",
        },
        confirmationModal: {
          deleteTitle: "Excluir",
          deleteMessage:
            "Todos los datos del usuario se perderán.El servicio abierto de este usuario se trasladará a la cola.",
        },
      },
      helps: {
        title: "Centro de ayuda",
      },
      schedules: {
        title: "Programación",
        confirmationModal: {
          deleteTitle: "¿Estás seguro de que quieres eliminar esta cita?",
          deleteMessage: "Esta acción no se puede revertir.",
        },
        table: {
          contact: "Contacto",
          body: "Mensaje",
          sendAt: "Fecha de programación",
          sentAt: "Fecha de envío",
          status: "Status",
          actions: "Acciones",
        },
        buttons: {
          add: "Nuevo programación",
        },
        toasts: {
          deleted: "Programación exitosa con éxito.",
        },
      },
      tags: {
        title: "Etiquetas",
        confirmationModal: {
          deleteTitle: "¿Estás seguro de que quieres eliminar esta etiqueta?",
          deleteMessage: "Esta acción no se puede revertir.",
		  deleteAllMessage: "¿Estás seguro de que quieres eliminar todas las etiquetas?",
		  deleteAllTitle: "Borrar",
        },
        table: {
          name: "Nombre",
          color: "Color",
          tickets: "registros",
          actions: "Acciones",
        },
        buttons: {
          add: "Nuevo",
		  deleteAll: "Borrar",
        },
        toasts: {
		  deletedAll: "¡Todas las etiquetas se eliminan con éxito!",
          deleted: "Etiqueta excluida con éxito.",
        },
      },
      settings: {
        success: "Éxito.",
        title: "Ajustes",
        settings: {
          userCreation: {
            name: "Creación de usuarios",
            options: {
              enabled: "Activado",
              disabled: "Desactivado",
            },
          },
        },
      },
      messagesList: {
        header: {
          assignedTo: "Atribuido a:",
          buttons: {
            return: "Regresar",
            resolve: "Resolver",
            reopen: "Re abrir",
            accept: "Aceptar",
          },
        },
      },
      messagesInput: {
        placeholderOpen: "Ingrese un mensaje",
        placeholderClosed:
          "aceptar este Ticket para enviar un mensaje.",
        signMessage: "Para firmar",
      },
      contactDrawer: {
        header: "Datos de contacto",
        buttons: {
          edit: "Editar contacto",
        },
        extraInfo: "Otra información",
      },
      fileModal: {
        title: {
          add: "Agregar lista de archivos",
          edit: "Editar lista de archivos",
        },
        buttons: {
          okAdd: "Guardar",
          okEdit: "Editar",
          cancel: "Cancelar",
          fileOptions: "Agregar archivo",
        },
        form: {
          name: "Nombre de la lista de archivos",
          message: "Detalles de la lista",
          fileOptions: "Lista de archivos",
          extraName: "Mensaje para enviar con archivo",
          extraValue: "Valor de opción",
        },
        success: "Lista de archivos guarda correctamente!",
      },
      ticketOptionsMenu: {
        schedule: "Programación",
        delete: "Borrar",
        transfer: "Transferir",
        registerAppointment: "Observaciones de contacto",
        appointmentsModal: {
          title: "Observaciones de contacto",
          textarea: "Observación",
          placeholder: "Ingrese aquí la información que desea registrar",
        },
        confirmationModal: {
          title: "Borrar ticket",
		  titleFrom: "contacto ",
          message:
            "¡Atención!Se perderán todos los mensajes relacionados con los Ticket.",
        },
        buttons: {
          delete: "Borrar",
          cancel: "Cancelar",
        },
      },
      confirmationModal: {
        buttons: {
          confirm: "Ok",
          cancel: "Cancelar",
        },
      },
      messageOptionsMenu: {
        delete: "Deletar",
        reply: "Responder",
        confirmationModal: {
          title: "Apagar mensaje?",
          message: "Esta acción no se puede revertir.",
        },
      },
      backendErrors: {
        ERR_NO_OTHER_WHATSAPP: "Debe haber al menos un whatsapp estándar.",
        ERR_NO_DEF_WAPP_FOUND:
          "No se encuentra WhatsApp estándar.Verifique la página de conexión.",
        ERR_WAPP_NOT_INITIALIZED:
          "Esta sesión de WhatsApp no ​​se ha inicializado.Verifique la página de conexión.",
        ERR_WAPP_CHECK_CONTACT:
          "No fue posible verificar el contacto de WhatsApp.Verifique la página de conexión",
        ERR_WAPP_INVALID_CONTACT: "Este no es un número válido de WhatsApp.",
        ERR_WAPP_DOWNLOAD_MEDIA:
          "No fue posible descargar medios de WhatsApp.Verifique la página de conexión.",
        ERR_INVALID_CREDENTIALS:
          "Error de autenticación.Por favor intente de nuevo.",
        ERR_SENDING_WAPP_MSG:
          "Error al enviar un mensaje desde WhatsApp.Verifique la página de conexión.",
        ERR_DELETE_WAPP_MSG: "No fue posible eliminar el mensaje de WhatsApp.",
        ERR_OTHER_OPEN_TICKET: "Ya hay un boleto abierto para este contacto.",
        ERR_SESSION_EXPIRED: "Sesión vencida.Por favor.",
        ERR_USER_CREATION_DISABLED:
          "La creación de usuarios fue deshabilitada por el administrador.",
        ERR_NO_PERMISSION: "No se le permite acceder a esta función.",
        ERR_DUPLICATED_CONTACT: "Ya hay un contacto con este número.",
        ERR_NO_SETTING_FOUND: "No se encontró configuración con esto ID.",
        ERR_NO_CONTACT_FOUND: "No se encontró contacto con esto ID.",
        ERR_NO_TICKET_FOUND: "No se encuentra el boleto con esto ID.",
        ERR_NO_USER_FOUND: "No se encuentra usuario con esto ID.",
        ERR_NO_WAPP_FOUND: "No se encuentra whatsapp con esto ID.",
        ERR_CREATING_MESSAGE: "Error al crear mensaje en la base de datos.",
        ERR_CREATING_TICKET: "Error al crear un boleto en la base de datos.",
        ERR_FETCH_WAPP_MSG:
          "Error Al buscar el mensaje en WhatsApp, tal vez sea muy antiguo.",
        ERR_QUEUE_COLOR_ALREADY_EXISTS:
          "Este color ya está en uso, elija otro.",
        ERR_WAPP_GREETING_REQUIRED:
          "El mensaje de saludo es obligatorio cuando hay más de una línea..",
      },
    },
  },
};

export { messages };
